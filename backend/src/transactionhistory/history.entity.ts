import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.transactionHistory)
  account: Account;

  @Column()
  type: 'deposit' | 'withdraw' | 'transfer' | 'loan-payment';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  recipientAccountId: number; // Apenas para transferências

  @CreateDateColumn()
  timestamp: Date;
}
