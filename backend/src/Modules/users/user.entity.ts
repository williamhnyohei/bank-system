import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  OneToOne, 
  JoinColumn 
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Customer } from '../customer/customer.entity';
import { Account } from '../accounts/account.entity';

@Entity()
export class User_bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'O e-mail deve ser válido!' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio!' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'A senha não pode estar vazia!' })
  password: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'O CPF deve conter 11 dígitos' })
  @Length(11, 11, { message: 'O CPF deve conter exatamente 11 dígitos' })
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
  cpf: string;

  @OneToMany(() => Account, (account) => account.user, { cascade: true, onDelete: 'CASCADE' })
  accounts: Account[];

  @OneToOne(() => Customer, (customer) => customer.user, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'userId' })
  customer: Customer;  
}
