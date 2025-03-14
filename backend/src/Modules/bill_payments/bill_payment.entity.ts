import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class BillPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string; // Ex: "Conta de Luz", "Boleto Faculdade"

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // Valor do pagamento

  @CreateDateColumn()
  dueDate: Date; // Data de vencimento

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', nullable: true })
  paymentDate: Date;

  @ManyToOne(() => Account, (account) => account.billPayments)
  account: Account;

  @OneToMany(() => Transaction, (transaction) => transaction.billPayment)
  transactions: Transaction[]; // Relacionamento com múltiplas transações
}
