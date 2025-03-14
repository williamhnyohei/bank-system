import { webcrypto } from 'crypto';
if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}
import { DataSource } from 'typeorm';
import { User_bank } from '../../Modules/users/user.entity';
import { Account } from '../../Modules/accounts/account.entity';
import { Branch } from '../../Modules/branches/branch.entity';
import { Card } from '../../Modules/card/card.entity';
import { Customer } from '../../Modules/customer/customer.entity';
import { Investment } from '../../Modules/investments/investment.entity';
import { Loan } from '../../Modules/loan/loan.entity';
import { TransactionHistory } from '../../Modules/transactionhistory/history.entity';
import { Transaction } from '../../Modules/transactions/transaction.entity';
import { BillPayment } from '../../Modules/bill_payments/bill_payment.entity';
import { generateValidCPF } from '../../Utils/cpfGenerator';
import { TransactionType } from '../../Enum/transactiontype.enum';
import 'dotenv/config';

// 📌 Conexão com o banco de dados
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
  synchronize: true, // ⚠️ NÃO USAR EM PRODUÇÃO
});

async function seedDatabase() {
  await dataSource.initialize();
  console.log('📌 Conectado ao banco de dados.');

  await dataSource.query(`
    TRUNCATE TABLE 
      "transaction_history", 
      "transaction", 
      "bill_payment", 
      "loan", 
      "investment", 
      "card", 
      "account", 
      "user_bank", 
      "customer", 
      "branch" 
    CASCADE;
  `);
  console.log('⚠️ Todas as tabelas foram truncadas com CASCADE.');  

  // 🔹 Criar Usuários e Clientes corretamente
  const users: User_bank[] = [];
  const customers: Customer[] = [];

  for (let i = 1; i <= 10; i++) {
    // Criando Usuário primeiro
    const user = new User_bank();
    user.cpf = generateValidCPF();
    user.email = `user${i}@example.com`;
    user.password = `password${i}`;

    await dataSource.manager.save(user); // 🔹 Primeiro salvamos o usuário

    // Criando Cliente vinculado ao Usuário
    const customer = new Customer();
    customer.fullName = `Cliente ${i}`;
    customer.address = `Rua Exemplo, ${i}`;
    customer.phoneNumber = `(11) 90000-000${i}`;
    customer.user = user; // 🔹 Associamos o cliente ao usuário antes de salvar

    await dataSource.manager.save(customer); // 🔹 Agora salvamos o cliente

    users.push(user);
    customers.push(customer);
  }
  console.log('🔑 10 Usuários e 10 Clientes criados corretamente.');

  // 🔹 Criar Agências
  const branches: Branch[] = [];
  for (let i = 1; i <= 10; i++) {
    const branch = new Branch();
    branch.name = `Agência ${i}`;
    branch.address = `Rua ${i}, Centro`;
    branch.city = 'Cidade Exemplo';
    branch.state = 'SP';
    branch.branchCode = `BRC${i}`;
    await dataSource.manager.save(branch);
    branches.push(branch);
  }
  console.log('🏦 10 Agências criadas.');

  // 🔹 Criar Contas Bancárias
  const accounts: Account[] = [];
  for (let i = 1; i <= 10; i++) {
    const account = new Account();
    account.user = users[i - 1];
    account.customer = customers[i - 1];
    account.balance = Math.floor(Math.random() * 10000);
    account.branch = branches[i % branches.length];
    account.overdraftLimit = 1000;
    await dataSource.manager.save(account);
    accounts.push(account);
  }
  console.log('💰 10 Contas bancárias criadas.');

  // 🔹 Criar Cartões
  for (let i = 1; i <= 10; i++) {
    const card = new Card();
    card.account = accounts[i - 1];
    card.cardNumber = `1234-5678-9012-34${i}`;
    card.expirationDate = '12/29';
    card.cvv = `${100 + i}`;
    await dataSource.manager.save(card);
  }
  console.log('💳 10 Cartões criados.');

  // 🔹 Criar Transações
  for (let i = 1; i <= 10; i++) {
    const transaction = new Transaction();
    transaction.account = accounts[i - 1];
    transaction.amount = Math.floor(Math.random() * 2000) - 1000;
    transaction.type = i % 2 === 0 ? 'deposit' : 'withdrawal';
    await dataSource.manager.save(transaction);
  }
  console.log('💸 10 Transações criadas.');

  // 🔹 Criar Históricos de Transação
  for (let i = 1; i <= 10; i++) {
    const history = new TransactionHistory();
    history.account = accounts[i - 1];
    history.description = `Histórico da transação ${i}`;
    history.type = i % 2 === 0 ? TransactionType.DEPOSIT : TransactionType.WITHDRAW;
    history.amount = Math.floor(Math.random() * 5000) + 100;
    history.recipientAccountId = accounts[(i + 1) % accounts.length].id;
    history.timestamp = new Date();

    await dataSource.manager.save(history);
  }
  console.log('📜 10 Históricos de transação criados.');

  // 🔹 Criar Empréstimos
  for (let i = 1; i <= 10; i++) {
    const loan = new Loan();
    loan.account = accounts[i - 1];
    loan.amount = Math.floor(Math.random() * 5000) + 500;
    loan.interestRate = Number((Math.random() * 5 + 5).toFixed(2));
    loan.termMonths = 12 + i;
    loan.createdAt = new Date();
    loan.isPaid = Math.random() > 0.5;
    loan.dueDate = new Date();
    loan.dueDate.setMonth(loan.dueDate.getMonth() + loan.termMonths);

    await dataSource.manager.save(loan);
  }
  console.log('🏦 10 Empréstimos criados.');

  // 🔹 Criar Investimentos
  for (let i = 1; i <= 10; i++) {
    const investment = new Investment();
    investment.account = accounts[i - 1];
    investment.type = i % 2 === 0 ? 'Ações' : 'Renda Fixa';
    investment.assetName = `Ativo ${i}`;
    investment.amount = parseFloat((Math.random() * 50 + 1).toFixed(2));
    investment.pricePerUnit = parseFloat((Math.random() * 500 + 10).toFixed(2));
    investment.totalValue = parseFloat((investment.amount * investment.pricePerUnit).toFixed(2));
    investment.purchaseDate = new Date();

    await dataSource.manager.save(investment);
  }
  console.log('📈 10 Investimentos criados.');

  console.log('✅ Banco de dados populado com sucesso!');
  await dataSource.destroy();
}

// Executar Seed
seedDatabase().catch((error) => {
  console.error('❌ Erro ao popular banco:', error);
});
