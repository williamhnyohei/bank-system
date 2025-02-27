import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController], // Adiciona o controller
  providers: [CustomerService], // Adiciona o serviço
})
export class CustomerModule {}
