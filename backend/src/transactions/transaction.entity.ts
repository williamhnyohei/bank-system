import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: 'deposit' | 'withdraw' | 'transfer';

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;
}