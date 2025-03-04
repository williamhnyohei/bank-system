import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Transaction } from '../transactions/transaction.entity';
@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ unique: true })
  branchCode: string;

  @OneToMany(() => Account, (account) => account.branch)
  accounts: Account[];

  @OneToMany(() => Transaction, (transaction) => transaction.branch)
  transactions: Transaction[];
}
