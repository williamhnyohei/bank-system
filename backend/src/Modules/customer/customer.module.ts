import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { User_bank } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User_bank])], // ✅ Registra os repositórios
  controllers: [CustomerController],
  providers: [CustomerService], // ✅ O EntityManager já é injetado automaticamente pelo TypeORM
  exports: [CustomerService, TypeOrmModule], // ✅ Exporta para uso em outros módulos
})
export class CustomerModule {}
