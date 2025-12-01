import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { CoreModule } from './core/core.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module'; 
import { HealthModule } from './core/health/health.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
       envFilePath: '.env',
     }),
 
    
    HealthModule,
    CoreModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ], 
  controllers: [],  // 👈 ajout du contrôleur
  providers: [],   
}) 

@Module({
  imports: [
    CoreModule,
    HealthModule,  // HealthModule séparé
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}