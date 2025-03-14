import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn, 
  OneToMany, 
  JoinColumn 
} from 'typeorm';
import { Account } from '../accounts/account.entity';
import { TransactionType } from '../../Enum/transactiontype.enum';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.transactionHistory, { onDelete: 'CASCADE' }) // 🔹 Correção do nome da relação
  @JoinColumn({ name: 'accountId' }) // 🔹 Define explicitamente a chave estrangeira
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
