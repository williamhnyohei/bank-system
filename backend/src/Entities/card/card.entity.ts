import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: string;

  @Column()
  expirationDate: string;

  @Column()
  cvv: string;

  @Column({ type: 'varchar', length: 20 })
  type: string; // 'credit' ou 'debit'

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  limit: number;

  @ManyToOne(() => Account, (account) => account.cards)
  account: Account;
}

@Entity()
export class DebitCard extends Card {
  @Column({ default: 0 })
  overdraftLimit: number; // Limite de cheque especial
}

@Entity()
export class CreditCard extends Card {
  @Column()
  creditLimit: number;
}