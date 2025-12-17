import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Product, product => product.category)
  @Exclude() // Exclure les produits de la réponse par défaut
  products: Product[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}