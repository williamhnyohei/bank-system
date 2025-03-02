import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { TransactionType } from '../../Enum/transactiontype.enum';
import { OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.transactionHistory)
  account: Account;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  recipientAccountId: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  description: string;

  @OneToMany(() => Transaction, (transaction) => transaction.history)
  transactions: Transaction[];
}