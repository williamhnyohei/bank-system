import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../Modules/users/user.module';
import { User_bank } from 'src/Modules/users/user.entity'; 
import { Account } from 'src/Modules/accounts/account.entity';
import { Branch } from 'src/Modules/branches/branch.entity';
import { Transaction } from 'src/Modules/transactions/transaction.entity';
import { Investment } from 'src/Modules/investments/investment.entity';
import { BillPayment } from 'src/Modules/bill_payments/bill_payment.entity';
import { Card } from 'src/Modules/card/card.entity';
import { Loan } from 'src/Modules/loan/loan.entity';
import { TransactionHistory } from 'src/Modules/transactionhistory/history.entity';
import { Customer } from 'src/Modules/customer/customer.entity';

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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
