import { DataSource } from 'typeorm';
import { User_bank } from '../../Entities/users/user.entity';
import { Account } from '../../Entities/accounts/account.entity';
import { Branch } from '../../Entities/branches/branch.entity';
import { Card } from '../../Entities/card/card.entity';
import { Customer } from '../../Entities/customer/customer.entity';
import { Investment } from '../../Entities/investments/investment.entity';
import { Loan } from '../../Entities/loan/loan.entity';
import { TransactionHistory } from '../../Entities/transactionhistory/history.entity';
import { Transaction } from '../../Entities/transactions/transaction.entity';
import { BillPayment } from '../../Entities/bill_payments/bill_payment.entity';
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

  // 🔹 Criar Clientes
  const customers: Customer[] = [];
  for (let i = 1; i <= 10; i++) {
    const customer = new Customer();
    customer.fullName = `Cliente ${i}`;
    customer.cpf = generateValidCPF();
    customer.address = `Rua Exemplo, ${i}`;
    customer.phoneNumber = `(11) 90000-000${i}`;
    await dataSource.manager.save(customer);
    customers.push(customer);
  }
  console.log('👤 10 Clientes criados.');

  // 🔹 Criar Usuários
  const users: User_bank[] = [];
  for (let i = 1; i <= 10; i++) {
    const user = new User_bank();
    user.name = `user${i}`;
    user.email = `user${i}@example.com`;
    user.password = `password${i}`;
    user.customer = customers[i - 1];
    await dataSource.manager.save(user);
    users.push(user);
}
  console.log('🔑 10 Usuários criados.');

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

  // 🔹 Criar Pagamentos de Boletos
  for (let i = 1; i <= 10; i++) {
    const billPayment = new BillPayment();
    billPayment.account = accounts[i - 1];
    billPayment.description = i % 2 === 0 ? 'Conta de Luz' : 'Boleto Faculdade';
    billPayment.amount = parseFloat((Math.random() * 500 + 50).toFixed(2));
    billPayment.dueDate = new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30)));
    billPayment.isPaid = Math.random() > 0.5;

    if (billPayment.isPaid) {
        billPayment.paymentDate = new Date(new Date().setDate(billPayment.dueDate.getDate() - Math.floor(Math.random() * 5)));
    } else {
        billPayment.paymentDate = new Date();
    }

    await dataSource.manager.save(billPayment);
  }
  console.log('🧾 10 Pagamentos de boleto criados.');

  console.log('✅ Banco de dados populado com sucesso!');
  await dataSource.destroy();
}

// Executar Seed
seedDatabase().catch((error) => {
  console.error('❌ Erro ao popular banco:', error);
});
