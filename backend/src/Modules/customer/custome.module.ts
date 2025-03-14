import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // Registra a entidade Customer
  exports: [TypeOrmModule], // Permite que outros módulos usem esse repositório
})
export class CustomerModule {}
