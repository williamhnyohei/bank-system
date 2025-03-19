import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/customer.dto';
import { User_bank } from '../users/user.entity';
import { Account } from '../accounts/account.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(User_bank)
    private readonly userRepository: Repository<User_bank>,

    private readonly entityManager: EntityManager // ✅ Injetando EntityManager
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    if (!createCustomerDto.userId) {
      throw new NotFoundException('O campo userId é obrigatório.');
    }

    const user = await this.userRepository.findOne({
      where: { id: createCustomerDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const customer = this.customerRepository.create({
      ...createCustomerDto,
      user,
    });

    return await this.customerRepository.save(customer);
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find({ relations: ['user'] });
  }

  async update(id: string, updateCustomerDto: Partial<CreateCustomerDto>): Promise<Customer> {
    const customer = await this.findOne(id);

    if (updateCustomerDto.userId) {
      const user = await this.userRepository.findOne({ where: { id: updateCustomerDto.userId } });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      customer.user = user;
    }

    Object.assign(customer, updateCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    console.log(`Tentando remover Customer com ID: ${id}`);

    await this.entityManager.transaction(async (transactionManager) => {
      const customer = await transactionManager.findOne(Customer, {
        where: { id },
        relations: ['accounts', 'user'],
      });

      if (!customer) {
        throw new NotFoundException(`Customer com ID ${id} não encontrado`);
      }

      // 🚀 Remover entidades relacionadas às contas primeiro
      for (const account of customer.accounts) {
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

      // 🚀 Agora podemos remover todas as contas associadas ao Customer
      if (customer.accounts.length > 0) {
        console.log(`Removendo ${customer.accounts.length} contas associadas...`);
        await transactionManager.delete(Account, { customer: { id } });
      }

      // 🚀 Se houver um 'user' associado, podemos remover também (se necessário)
      if (customer.user) {
        console.log(`Removendo usuário associado ao customer`);
        await transactionManager.query(
          `DELETE FROM user_bank WHERE "id" = $1`, 
          [customer.user.id]
        );
      }

      // 🚀 Por fim, removemos o próprio Customer
      console.log(`Removendo customer`);
      await transactionManager.delete(Customer, id);

      console.log(`Customer removido com sucesso.`);
    });
  }
}
