import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() filterDto: FilterProductsDto) {
    return this.productsService.findAll(filterDto);
  }

  @Get('featured')
  getFeaturedProducts(@Query('limit') limit?: number) {
    return this.productsService.getFeaturedProducts(limit);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.productsService.searchProducts(query);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getStats() {
    return this.productsService.getProductStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deactivate(@Param('id') id: string) {
    return this.productsService.deactivate(id);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.productsService.updateStock(id, quantity);
  }

  @Get('category/:categoryId')
  getByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.getProductsByCategory(categoryId);
  }
}