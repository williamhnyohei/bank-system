import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Ex: "Ações", "Renda Fixa", "Fundos"

  @Column()
  assetName: string; // Nome do ativo (Ex: "Tesouro Selic", "AAPL", "Fundo XPTO")

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // Quantidade do ativo comprado

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerUnit: number; // Preço unitário do ativo na compra

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalValue: number; // Valor total do investimento (amount * pricePerUnit)

  @CreateDateColumn()
  purchaseDate: Date; // Data da compra

  @ManyToOne(() => Account, (account) => account.investments)
  account: Account; // Conta do usuário que fez o investimento
}
