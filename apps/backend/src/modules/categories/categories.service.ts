import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Vérifier si la catégorie existe déjà
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: createCategoryDto.name }
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' }
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['products']
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoriesRepository.findOne({ where: { name } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    // Vérifier si le nouveau nom existe déjà
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.findByName(updateCategoryDto.name);
      if (existingCategory) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    
    // Vérifier si la catégorie a des produits
    const productCount = await this.categoriesRepository
      .createQueryBuilder('category')
      .leftJoin('category.products', 'product')
      .where('category.id = :id', { id })
      .andWhere('product.isActive = true')
      .getCount();

    if (productCount > 0) {
      throw new BadRequestException('Cannot delete category with active products');
    }

    await this.categoriesRepository.remove(category);
  }

  async deactivate(id: string): Promise<Category> {
    const category = await this.findOne(id);
    category.isActive = false;
    return await this.categoriesRepository.save(category);
  }

  async getCategoryStats() {
    return await this.categoriesRepository
      .createQueryBuilder('category')
      .leftJoin('category.products', 'product', 'product.isActive = true')
      .select([
        'category.id',
        'category.name',
        'COUNT(product.id) as product_count',
        'AVG(product.price) as avg_price',
        'SUM(product.stock_quantity) as total_stock'
      ])
      .groupBy('category.id')
      .orderBy('product_count', 'DESC')
      .getRawMany();
  }
}