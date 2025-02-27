import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Card } from '../card/card.entity';
import { Branch } from '../branches/branch.entity';
import { Investment } from '../investments/investment.entity';
import { BillPayment } from '../bill_payments/bill_payment.entity';
import { Customer } from '../customer/customer.entity';
import { Loan } from '../loan/loan.entity';
import { TransactionHistory } from '../transactionhistory/history.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  overdraftLimit: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  customer: Customer;

  @ManyToOne(() => Branch, (branch) => branch.accounts)
  branch: Branch;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => Card, (card) => card.account)
  cards: Card[];

  @OneToMany(() => Loan, (loan) => loan.account)
  loans: Loan[];

  @OneToMany(() => Investment, (investment) => investment.account)
  investments: Investment[];

  @OneToMany(() => BillPayment, (billPayment) => billPayment.account)
  billPayments: BillPayment[];

  @OneToMany(() => TransactionHistory, (history) => history.account)
  transactionHistory: TransactionHistory[];
}