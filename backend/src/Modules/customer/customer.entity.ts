import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToOne, 
  OneToMany, 
  JoinColumn 
} from 'typeorm';
import { User_bank } from '../users/user.entity';
import { Account } from '../accounts/account.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @OneToOne(() => User_bank, (user) => user.customer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) 
  user: User_bank;

  @Column({ nullable: false })
  userId: string; // Adiciona explicitamente a coluna para manter referência ao User

  @OneToMany(() => Account, (account) => account.customer, { cascade: true, onDelete: 'CASCADE' })
  accounts: Account[];
}
