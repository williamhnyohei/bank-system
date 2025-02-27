import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Account } from '../accounts/account.entity';
import { Loan } from '../loan/loan.entity';
import { IsNotEmpty, IsString, Length, Matches, Validate } from 'class-validator';
import { CpfValidator } from './validator/cpf.validator';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
  @Validate(CpfValidator, { message: 'CPF inválido' })
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
