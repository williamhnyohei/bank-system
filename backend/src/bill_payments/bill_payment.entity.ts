import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';

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
  isPaid: boolean; // Indica se a conta já foi paga

  @Column({ type: 'timestamp', nullable: true })
  paymentDate: Date | null; // Permitir que seja null

  @ManyToOne(() => Account, (account) => account.billPayments)
  account: Account; // Conta bancária do usuário que realizou o pagamento
}
