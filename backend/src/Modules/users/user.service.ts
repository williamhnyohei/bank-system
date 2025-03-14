import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User_bank } from './user.entity';
import { Account } from '../accounts/account.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Customer } from '../customer/customer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User_bank)
    private readonly userRepository: Repository<User_bank>,
    
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    private readonly dataSource: DataSource
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User_bank> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User_bank> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['accounts', 'customer'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async findAll(): Promise<User_bank[]> {
    return await this.userRepository.find({ relations: ['accounts', 'customer'] });
  }

  async update(id: string, updateUserDto: Partial<User_bank>): Promise<User_bank> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    console.log(`Tentando remover usuário com ID: ${id}`);
  
    await this.dataSource.transaction(async (transactionManager) => {
      const user = await transactionManager.findOne(User_bank, {
        where: { id },
        relations: ['customer', 'accounts'],
      });
  
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
  
      // 🚀 Remover entidades relacionadas às contas primeiro
      for (const account of user.accounts) {
        console.log(`Removendo empréstimos associados à conta ID: ${account.id}`);
        await transactionManager.query(
          `DELETE FROM loan WHERE "accountId" = $1`,
          [account.id]
        );
  
        console.log(`Removendo transações associadas à conta ID: ${account.id}`);
        await transactionManager.query(
          `DELETE FROM transaction WHERE "accountId" = $1`,
          [account.id]
        );
  
        console.log(`Removendo cartões associados à conta ID: ${account.id}`);
        await transactionManager.query(
          `DELETE FROM card WHERE "accountId" = $1`,
          [account.id]
        );
  
        console.log(`Removendo investimentos associados à conta ID: ${account.id}`);
        await transactionManager.query(
          `DELETE FROM investment WHERE "accountId" = $1`,
          [account.id]
        );
  
        console.log(`Removendo pagamentos associados à conta ID: ${account.id}`);
        await transactionManager.query(
          `DELETE FROM bill_payment WHERE "accountId" = $1`,
          [account.id]
        );
      }
  
      // 🚀 Agora podemos remover todas as contas associadas ao usuário
      if (user.accounts.length > 0) {
        console.log(`Removendo ${user.accounts.length} contas associadas...`);
        await transactionManager.delete(Account, { user: { id } });
      }
  
      // 🚀 Se houver um 'customer', remover também
      if (user.customer) {
        console.log(`Removendo customer associado ao usuário`);
        await transactionManager.query(
          `DELETE FROM customer WHERE "user_id" = $1`, 
          [id]
        );
      }
  
      // 🚀 Por fim, removemos o próprio usuário
      console.log(`Removendo usuário`);
      await transactionManager.delete(User_bank, id);
  
      console.log(`Usuário removido com sucesso.`);
    });
  }
}
