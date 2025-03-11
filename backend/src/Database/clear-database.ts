import { webcrypto } from 'crypto';
if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}
import { DataSource } from 'typeorm';
import { User_bank } from 'src/Modules/users/user.entity';
import { Account } from 'src/Modules/accounts/account.entity';
import { Branch } from 'src/Modules/branches/branch.entity';
import { Card } from 'src/Modules/card/card.entity';
import { Customer } from 'src/Modules/customer/customer.entity';
import { Investment } from 'src/Modules/investments/investment.entity';
import { Loan } from 'src/Modules/loan/loan.entity';
import { TransactionHistory } from 'src/Modules/transactionhistory/history.entity';
import { Transaction } from 'src/Modules/transactions/transaction.entity';
import { BillPayment } from 'src/Modules/bill_payments/bill_payment.entity';
import 'dotenv/config';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User_bank, Account, Branch, Card, Customer, Investment, Loan, TransactionHistory, Transaction, BillPayment,
  ],
  synchronize: true,
});

async function clearDatabase() {
  await dataSource.initialize();
  console.log('⚠️  Conectado ao banco de dados. Limpando todas as tabelas...');

  try {
    // 🔹 Apagar os registros com `CASCADE` para evitar erros de chave estrangeira
    await dataSource.query('TRUNCATE TABLE "bill_payment" CASCADE');
    await dataSource.query('TRUNCATE TABLE "transaction_history" CASCADE');
    await dataSource.query('TRUNCATE TABLE "transaction" CASCADE');
    await dataSource.query('TRUNCATE TABLE "investment" CASCADE');
    await dataSource.query('TRUNCATE TABLE "card" CASCADE');
    await dataSource.query('TRUNCATE TABLE "loan" CASCADE');
    await dataSource.query('TRUNCATE TABLE "account" CASCADE');
    await dataSource.query('TRUNCATE TABLE "user_bank" CASCADE');
    await dataSource.query('TRUNCATE TABLE "customer" CASCADE');
    await dataSource.query('TRUNCATE TABLE "branch" CASCADE');

    console.log('✅ Todas as tabelas foram limpas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao limpar o banco de dados:', error);
  } finally {
    await dataSource.destroy();
  }
}

// Executar o script
clearDatabase().catch((error) => console.error('❌ Erro ao executar clear database:', error));
