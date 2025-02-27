import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { OneToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'O e-mail deve ser válido!' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio!' })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;
}
