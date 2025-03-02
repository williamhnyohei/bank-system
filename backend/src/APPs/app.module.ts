import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User_bank } from '../Entities/users/user.entity';
import { Account } from '../Entities/accounts/account.entity';
import { Branch } from '../Entities/branches/branch.entity';
import { Transaction } from '../Entities/transactions/transaction.entity';
import { Investment } from '../Entities/investments/investment.entity';
import { BillPayment } from '../Entities/bill_payments/bill_payment.entity';
import { Card } from '../Entities/card/card.entity';
import { Loan } from '../Entities/loan/loan.entity';
import { TransactionHistory } from '../Entities/transactionhistory/history.entity';
import { Customer } from '../Entities/customer/customer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Carrega a configuração do TypeORM usando as variáveis de ambiente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User_bank,
          Account,
          Branch,
          Transaction,
          Investment,
          BillPayment,
          Card,
          Loan,
          TransactionHistory,
          Customer,
        ],
        autoLoadEntities: true,
        synchronize: true, // Em produção, use migrations
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
