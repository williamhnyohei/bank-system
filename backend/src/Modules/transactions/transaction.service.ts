import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({ relations: ['account', 'billPayment', 'loan', 'investment'] });
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: Number(id) }, // 🔹 Convertendo `id` para `number`
      relations: ['account', 'billPayment', 'loan', 'investment'],
    });
  
    if (!transaction) {
      throw new NotFoundException(`Transação de ID ${id} não encontrada`);
    }
    return transaction;
  }
  

  async update(id: string, updateData: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.findOne(id);
    Object.assign(transaction, updateData);
    return this.transactionRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.transactionRepository.delete(id);
  }
}
