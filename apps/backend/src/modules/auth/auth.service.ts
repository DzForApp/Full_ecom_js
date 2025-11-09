import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    // ✅ On retourne le user sans son password pour sécurité
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async register(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already in use');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ ...dto, password: hash });

    const token = await this.generateToken(user);
    return { message: 'User registered successfully', token };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password); // ✅ on réutilise la fonction
    const token = await this.generateToken(user);
    return { message: 'Login successful', token };
  }

  private async generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.signAsync(payload);
  }
}
