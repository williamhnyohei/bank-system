import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Account } from '../accounts/account.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.loans)
  account: Account;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 5, scale: 2 })
  interestRate: number;

  @Column()
  termMonths: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'date' })  
  dueDate: Date;
}
