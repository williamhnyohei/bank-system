import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account])], // 🔹 Registra o repositório
  controllers: [AccountController],
  providers: [AccountService],
  exports: [TypeOrmModule], // 🔹 Exporta para outros módulos
})
export class AccountModule {}