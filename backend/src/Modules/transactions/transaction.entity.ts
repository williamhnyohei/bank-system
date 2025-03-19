import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { IsIn, IsPositive } from 'class-validator';
import { TransactionHistory } from '../transactionhistory/history.entity';
import { BillPayment } from '../bill_payments/bill_payment.entity';
import { Loan } from '../loan/loan.entity';
import { Branch } from '../branches/branch.entity';
import { Investment } from '../investments/investment.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsPositive({ message: 'O valor da transação deve ser positivo' })
  amount: number;

  @IsIn(['deposit', 'withdraw', 'transfer','loan-payment'], { message: 'Tipo de transação inválido' })
  type: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne(() => TransactionHistory, (history) => history.transactions)
  history: TransactionHistory;

  @ManyToOne(() => BillPayment, (billPayment) => billPayment.transactions, { nullable: true })
  billPayment: BillPayment;

  @ManyToOne(() => Loan, (loan) => loan.transactions, { nullable: true })
  loan: Loan;

  @ManyToOne(() => Branch, (branch) => branch.transactions, { nullable: true })
  branch: Branch;

  @ManyToOne(() => Investment, (investment) => investment.transactions, { nullable: true })
  investment: Investment;
}