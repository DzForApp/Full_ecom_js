import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In, FindOptionsWhere, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Vérifier si le SKU existe déjà
    if (createProductDto.sku) {
      const existingProduct = await this.productsRepository.findOne({
        where: { sku: createProductDto.sku }
      });

      if (existingProduct) {
        throw new ConflictException('Product with this SKU already exists');
      }
    }

    // Vérifier la catégorie si fournie
    if (createProductDto.categoryId) {
      const category = await this.categoriesService.findOne(createProductDto.categoryId);
      if (!category) {
        throw new NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
      }
    }

    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(filterDto?: FilterProductsDto): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
    const {
      search,
      categoryId,
      brand,
      vehicleType,
      minPrice,
      maxPrice,
      inStock,
      featured,
      minRating,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 20,
    } = filterDto || {};

    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Product> = { isActive: true };

    // Appliquer les filtres
    if (search) {
      where.name = Like(`%${search}%`);
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (brand) {
      where.brand = brand;
    }

    if (vehicleType) {
      where.vehicleType = vehicleType;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = Between(minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER);
    }

    if (inStock !== undefined) {
      if (inStock) {
        where.stockQuantity = MoreThan(0);
      } else {
        where.stockQuantity = 0;
      }
    }

    if (featured !== undefined) {
      where.isFeatured = featured;
    }

    if (minRating !== undefined) {
      where.rating = MoreThanOrEqual(minRating);
    }

    // Exécuter la requête
    const [products, total] = await this.productsRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
      relations: ['category'],
    });

    return {
      products,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findBySku(sku: string): Promise<Product | null> {
    return await this.productsRepository.findOne({ where: { sku } });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // Vérifier le SKU si fourni
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingProduct = await this.findBySku(updateProductDto.sku);
      if (existingProduct) {
        throw new ConflictException('Product with this SKU already exists');
      }
    }

    // Vérifier la catégorie si fournie
    if (updateProductDto.categoryId) {
      const category = await this.categoriesService.findOne(updateProductDto.categoryId);
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateProductDto.categoryId} not found`);
      }
    }

    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  async deactivate(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.isActive = false;
    return await this.productsRepository.save(product);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.updateStock(quantity);
    return await this.productsRepository.save(product);
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { isFeatured: true, isActive: true },
      order: { rating: 'DESC' },
      take: limit,
      relations: ['category'],
    });
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { categoryId, isActive: true },
      order: { name: 'ASC' },
      relations: ['category'],
    });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.name ILIKE :query', { query: `%${query}%` })
      .orWhere('product.description ILIKE :query', { query: `%${query}%` })
      .orWhere('product.brand ILIKE :query', { query: `%${query}%` })
      .andWhere('product.isActive = true')
      .orderBy('product.rating', 'DESC')
      .limit(20)
      .getMany();
  }

  async getProductStats() {
    return await this.productsRepository
      .createQueryBuilder('product')
      .select([
        'COUNT(*) as total_products',
        'SUM(CASE WHEN product.stock_quantity > 0 THEN 1 ELSE 0 END) as in_stock',
        'SUM(CASE WHEN product.is_featured = true THEN 1 ELSE 0 END) as featured',
        'AVG(product.price) as avg_price',
        'SUM(product.stock_quantity) as total_stock',
        'MAX(product.price) as max_price',
        'MIN(product.price) as min_price'
      ])
      .where('product.is_active = true')
      .getRawOne();
  }
}