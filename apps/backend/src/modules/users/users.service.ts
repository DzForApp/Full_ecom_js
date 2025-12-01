import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

   // CORRECTION : Retourne User[], pas User
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
///////////////////////////******************************CREATE ************************* */
  
async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nameEn, nameAr, phone, role } = createUserDto;
    // Vérifier si l'email existe déjà
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    //else______hash the pwd
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer l'utilisateur
    const user = new User();
      user.email = email.toLowerCase(),
      user.password = hashedPassword,  // Déjà hashé
      user.name_en = nameEn,
      user.name_ar = nameAr,
      user.phone =  phone || 'null',
      user.role =   role || UserRole.USER,
      user.isActive = true;
      // save the user
      const savedUser = this.usersRepository.save(user);
    return savedUser ;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { email: email.toLowerCase() } 
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async validateUser(email: string, plainPassword: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    
    if (user && await bcrypt.compare(plainPassword, user.password)) {
      return user;
    }
    
    return null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Hasher le mot de passe si fourni
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}