import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypedConfigService {
  constructor(private configService: ConfigService) {}

  get database() {
    return {
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USER', 'store'),
      password: this.configService.get<string>('DB_PASS', 'Store25'),
      database: this.configService.get<string>('DB_NAME', 'dbstore'),
    };
  }

  get jwt() {
    return {
      secret: this.configService.get<string>('JWT_SECRET', 'superSecretKey'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '24h'),
    };
  }

  get app() {
    return {
      port: this.configService.get<number>('PORT', 3000),
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
    };
  }
}