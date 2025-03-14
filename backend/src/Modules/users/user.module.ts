import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_bank } from './user.entity';
import { Account } from '../accounts/account.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomerModule } from '../customer/custome.module'; // ✅ Importando o CustomerModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User_bank, Account]),
    CustomerModule, // ✅ Incluindo o módulo de Customer
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
