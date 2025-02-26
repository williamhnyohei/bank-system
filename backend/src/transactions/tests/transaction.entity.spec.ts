import { Transaction } from '../transaction.entity';

describe('Transaction Entity', () => {
  it('deve criar uma transação válida', () => {
    const transaction = new Transaction();
    transaction.id = 1;
    transaction.amount = 500;
    transaction.type = 'deposit';

    expect(transaction).toBeDefined();
    expect(transaction.amount).toBeGreaterThan(0);
    expect(transaction.type).toMatch(/deposit|withdraw|transfer/);
  });
});