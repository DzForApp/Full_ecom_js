import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcryptjs/umd/types';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    //console.log('Login DTO:', dto); // 👈 pour tester si le body est reçu
     return this.authService.login(dto);
  }
 
  // ✅ Nouvelle route pour tester validateUser directement
  @Post('validate')
  async validateUser(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    console.log("is a valide user")
    return { valid: true, user };
  }

  // PROFILE  ROUTE ⭐
@UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('🔍 Request user in controller:', req.user);
    
    if (!req.user) {
      throw new UnauthorizedException('User not found in request');
    }
    
    return {
      message: 'Profile retrieved successfully',
      user: {
        id: req.user.id,
        email: req.user.email,
        nameEn: req.user.nameEn,
        nameAr: req.user.nameAr,
        role: req.user.role,
      }
    };
  }

// Dans auth.controller.ts
@Get('debug-token')
@UseGuards(JwtAuthGuard)
debugToken(@Request() req) {
  console.log('🔍 Full request object:', req);
  console.log('🔍 Request headers:', req.headers);
  console.log('🔍 Request user:', req.user);
  
  return {
    message: 'Debug information',
    user: req.user,
    headers: req.headers,
    rawToken: req.headers.authorization?.replace('Bearer ', '')
  };
}
}
