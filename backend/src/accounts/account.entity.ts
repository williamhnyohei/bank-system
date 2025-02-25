import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  balance: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}

