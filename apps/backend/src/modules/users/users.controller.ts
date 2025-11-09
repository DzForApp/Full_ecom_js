import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 🔹 Create a new user
   * Accessible via: POST /users
   */
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /**
   * 🔹 Get all users (for admin/debug purposes)
   * Accessible via: GET /users
   */
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * 🔹 Get user by ID
   * Accessible via: GET /users/:id
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
