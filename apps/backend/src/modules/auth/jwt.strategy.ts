import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'superSecretKey',
    });
  }

  async validate(payload: any) {
    console.log('🔐 JWT Payload:', payload);
    
    const user = await this.usersService.findOne(payload.sub);
    
    if (!user) {
      console.log('❌ User not found for ID:', payload.sub);
      return null;
    }
    
    // Retourner les données de l'utilisateur
    return {
      id: user.id,
      email: user.email,
      nameEn: user.name_en,
      nameAr: user.name_ar,
      role: user.role,
    };
  }
}