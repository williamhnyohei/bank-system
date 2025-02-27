import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Transaction } from '../transactions/transaction.entity';
import { OneToMany } from 'typeorm';
import { Card } from '../card/card.entity';
import { Branch } from '../branches/branch.entity';
import { Investment } from '../investments/investment.entity';
import { BillPayment } from '../bill_payments/bill_payment.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  balance: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => Card, (card) => card.account)
  cards: Card[];

  @ManyToOne(() => Branch, (branch) => branch.accounts)
  branch: Branch;

  @OneToMany(() => Investment, (investment) => investment.account)
  investments: Investment[];

  @OneToMany(() => BillPayment, (billPayment) => billPayment.account)
  billPayments: BillPayment[];
}
