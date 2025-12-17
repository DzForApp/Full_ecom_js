import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Exclude } from 'class-transformer';

@Entity('products')
@Index(['isActive', 'price']) // Index composite pour les recherches
@Index(['sku'], { unique: true })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity: number;

  @Column({ unique: true, nullable: true })
  sku: string;

  @ManyToOne(() => Category, category => category.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ name: 'vehicle_type', nullable: true })
  vehicleType: string;

  @Column('jsonb', { default: {} })
  specifications: Record<string, any>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Méthode pour vérifier la disponibilité
  isAvailable(): boolean {
    return this.isActive && this.stockQuantity > 0;
  }

  // Méthode pour mettre à jour le stock
  updateStock(quantity: number): void {
    this.stockQuantity += quantity;
    if (this.stockQuantity < 0) {
      this.stockQuantity = 0;
    }
  }
}