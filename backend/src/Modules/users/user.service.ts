import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_bank } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User_bank)
    private readonly userRepository: Repository<User_bank>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User_bank> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User_bank[]> {
    return this.userRepository.find({ relations: ['accounts', 'customer'] });
  }

  async findOne(id: string): Promise<User_bank> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['accounts', 'customer'],
    });
    if (!user) {
      throw new NotFoundException(`Usuário de ID ${id} não encontrado`);
    }
    return user;
  }

  async update(id: string, updateData: Partial<User_bank>): Promise<User_bank> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}