import { Account } from '../account.entity';

describe('Account Entity', () => {
  it('deve criar uma conta bancária válida', () => {
    const account = new Account();
    account.id = 1;
    account.balance = 1000;

    expect(account).toBeDefined();
    expect(account.balance).toBeGreaterThanOrEqual(0);
  });
});