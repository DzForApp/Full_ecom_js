import { Global, Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from './config/config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: TypedConfigService) => {
        const logger = new Logger('Database');
        const db = configService.database;
        
        logger.log(`Connecting to ${db.database} on ${db.host}:${db.port}`);
        
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.app.nodeEnv === 'development',
          logging: configService.app.nodeEnv === 'development',
          retryDelay: 3000,
          retryAttempts: 10,
          autoLoadEntities: true,
        };
      },
      inject: [TypedConfigService],
    }),
  ],
  providers: [TypedConfigService],
  exports: [ConfigModule, TypeOrmModule, TypedConfigService],
})
export class CoreModule {}