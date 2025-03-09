import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User_bank } from '../users/user.entity';
import { Account } from '../accounts/account.entity';
import { Loan } from '../loan/loan.entity';
import { IsNotEmpty, IsString, Length, Matches, Validate } from 'class-validator';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToOne(() => User_bank, (user) => user.customer)
  @JoinColumn()
  user: User_bank;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];

}
