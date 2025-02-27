import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Account } from '../accounts/account.entity';
import { Loan } from '../loan/loan.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];

  @OneToMany(() => Loan, (loan) => loan.customer)
  loans: Loan[];
}