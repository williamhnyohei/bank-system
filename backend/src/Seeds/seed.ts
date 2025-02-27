import { DataSource } from 'typeorm';
import { User } from '../Entities/users/user.entity';
import { Account } from '../Entities/accounts/account.entity';
import { Branch } from '../Entities/branches/branch.entity';
import { Card } from '../Entities/card/card.entity';
import { Customer } from '../Entities/customer/customer.entity';
import { Investment } from '../Entities/investments/investment.entity';
import { Loan } from '../Entities/loan/loan.entity';
import { TransactionHistory } from '../Entities/transactionhistory/history.entity';
import { Transaction } from '../Entities/transactions/transaction.entity';
import { BillPayment } from '../Entities/bill_payments/bill_payment.entity';
import { generateValidCPF } from '../Utils/cpfGenerator';


const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'bank_db',
  entities: [
    User, Account, Branch, Card, Customer, Investment, Loan, TransactionHistory, Transaction, BillPayment,
  ],
  synchronize: true,
});

async function seedDatabase() {
  await dataSource.initialize();
  console.log('📌 Conectado ao banco de dados.');

  const branches: Branch[] = [];
  for (let i = 1; i <= 10; i++) {
    const branch = new Branch();
    branch.name = `Agência ${i}`;
    branch.address = `Rua ${i}, Centro`;
    await dataSource.manager.save(branch);
    branches.push(branch);
  }
  console.log('🏦 10 Agências criadas.');

  const customers: Customer[] = [];
  for (let i = 1; i <= 10; i++) {
    const customer = new Customer();
    customer.fullName = `Cliente ${i}`;
    customer.cpf = generateValidCPF(); // CPF válido
    customer.address = `Rua Exemplo, ${i}`;
    customer.phoneNumber = `(11) 90000-000${i}`;
    await dataSource.manager.save(customer);
    customers.push(customer);
  }
  console.log('👤 10 Clientes criados com CPFs válidos.');

  const users: User[] = [];
  for (let i = 1; i <= 10; i++) {
    const user = new User();
    user.name = `user${i}`;
    user.password = `password${i}`;
    user.customer = customers[i - 1];
    await dataSource.manager.save(user);
    users.push(user);
  }
  console.log('🔑 10 Usuários criados.');

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

  const cards: Card[] = [];
  for (let i = 1; i <= 10; i++) {
    const card = new Card();
    card.account = accounts[i - 1];
    card.cardNumber = `1234-5678-9012-34${i}`;
    card.expirationDate = '12/29';
    card.cvv = `${100 + i}`;
    await dataSource.manager.save(card);
    cards.push(card);
  }
  console.log('💳 10 Cartões criados.');

  const transactions: Transaction[] = [];
  for (let i = 1; i <= 10; i++) {
    const transaction = new Transaction();
    transaction.account = accounts[i - 1];
    transaction.amount = Math.floor(Math.random() * 2000) - 1000;
    transaction.type = i % 2 === 0 ? 'deposit' : 'withdrawal';
    await dataSource.manager.save(transaction);
    transactions.push(transaction);
  }
  console.log('💸 10 Transações criadas.');

  for (let i = 1; i <= 10; i++) {
    const history = new TransactionHistory();
    history.account = accounts[i - 1];
    history.transactions = [transactions[i - 1]];
    history.description = `Histórico da transação ${i}`;
    await dataSource.manager.save(history);
  }
  console.log('📜 10 Históricos de transação criados.');

  for (let i = 1; i <= 10; i++) {
    const loan = new Loan();
    loan.account = accounts[i - 1];
    loan.amount = Math.floor(Math.random() * 5000);
    loan.interestRate = 5 + Math.random();
    loan.termMonths = 12 + i;
    await dataSource.manager.save(loan);
  }
  console.log('🏦 10 Empréstimos criados.');

  for (let i = 1; i <= 10; i++) {
    const investment = new Investment();
    investment.account = accounts[i - 1];
    investment.amount = Math.floor(Math.random() * 5000);
    investment.type = 'CDB';
    await dataSource.manager.save(investment);
  }
  console.log('📈 10 Investimentos criados.');

  for (let i = 1; i <= 10; i++) {
    const billPayment = new BillPayment();
    billPayment.account = accounts[i - 1];
    billPayment.amount = Math.floor(Math.random() * 300);
    billPayment.description = `Pagamento ${i}`;
    await dataSource.manager.save(billPayment);
  }
  console.log('🧾 10 Pagamentos de boleto criados.');

  console.log('✅ Banco de dados populado com sucesso!');
  await dataSource.destroy();
}

seedDatabase().catch((error) => console.error('❌ Erro ao popular banco:', error));
