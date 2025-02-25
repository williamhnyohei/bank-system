import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator'; // Importando a função de validação

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para criar um usuário com validação usando class-validator
  async create(user: User): Promise<User> {
    // Valida a entidade antes de salvar
    await validateOrReject(user); // Isso irá lançar erro caso haja alguma validação falha

    // Se não houver erro de validação, salva o usuário
    return this.userRepository.save(user);
  }

  // Método para buscar um usuário pelo ID
  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Método para atualizar um usuário
  async update(id: number, updatedUser: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, updatedUser);
    return this.userRepository.findOne({ where: { id } });
  }

  // Método para deletar um usuário
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}