import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { IsNotEmpty, IsEmail, IsString, Length, Matches, Validate } from 'class-validator';
import { Customer } from '../customer/customer.entity';
import { CpfValidator } from '../../Utils/cpf.validator';

@Entity()
export class User_bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
  @Validate(CpfValidator, { message: 'CPF inválido' })
  cpf: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'O e-mail deve ser válido!' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio!' })
  email: string;
  
  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.user, { cascade: true, onDelete: 'CASCADE' })
  accounts: Account[];

  @OneToOne(() => Customer, (customer) => customer.user, { cascade: true, onDelete: 'CASCADE' })
  customer: Customer;
}
