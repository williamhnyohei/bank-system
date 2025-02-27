import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { TransactionType } from './transactiontype.enum'; // Importa o Enum

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.transactionHistory)
  account: Account;

  @Column({ type: 'enum', enum: TransactionType }) // 🟢 Usa o Enum no banco de dados
  type: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  recipientAccountId: number; // Apenas para transferências

  @CreateDateColumn()
  timestamp: Date;
}