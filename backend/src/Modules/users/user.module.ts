import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_bank } from './user.entity';
import { Account } from '../accounts/account.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Customer } from '../customer/customer.entity';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User_bank, Account, Customer]), // ✅ Adicionando Customer aqui!
    CustomerModule, 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
