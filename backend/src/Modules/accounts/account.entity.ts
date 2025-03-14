import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User_bank } from '../users/user.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Card } from '../card/card.entity';
import { Branch } from '../branches/branch.entity';
import { Investment } from '../investments/investment.entity';
import { Loan } from '../loan/loan.entity';
import { TransactionHistory } from '../transactionhistory/history.entity';
import { Customer } from '../customer/customer.entity';
import { BillPayment } from '../bill_payments/bill_payment.entity';


@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) 
  overdraftLimit: number;

  @Column()
  balance: number;

  @ManyToOne(() => User_bank, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User_bank;

  @ManyToOne(() => Customer, (customer) => customer.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => Card, (card) => card.account)
  cards: Card[];

  @ManyToOne(() => Branch, (branch) => branch.accounts)
  branch: Branch;

  @OneToMany(() => Investment, (investment) => investment.account)
  investments: Investment[];

  @OneToMany(() => TransactionHistory, (history) => history.account)
  transactionHistory: TransactionHistory[];

  @OneToMany(() => BillPayment, (billPayment) => billPayment.account) // 🔹 Adicionado
  billPayments: BillPayment[];

  @OneToMany(() => Loan, (loan) => loan.account) // 🔹 Adicionado
  loans: Loan[];
}
