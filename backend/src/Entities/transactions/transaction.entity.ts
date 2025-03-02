import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { IsIn, IsPositive } from 'class-validator';
import { TransactionHistory } from '../transactionhistory/history.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @IsPositive({ message: 'O valor da transação deve ser positivo' })
  amount: number;

  @IsIn(['deposit', 'withdraw', 'transfer','loan-payment'], { message: 'Tipo de transação inválido' })
  type: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne(() => TransactionHistory, (history) => history.transactions)
  history: TransactionHistory;
}