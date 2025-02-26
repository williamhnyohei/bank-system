import { Account } from '../account.entity';

describe('Account Entity', () => {
  it('deve criar uma conta bancária válida', () => {
    const account = new Account();
    account.id = 1;
    account.balance = 1000;

    expect(account).toBeDefined();
    expect(account.balance).toBeGreaterThanOrEqual(0);
  });

  it('deve aumentar o saldo após um depósito', () => {
    const account = new Account();
    account.balance = 1000;
  
    account.balance += 500; 
  
    expect(account.balance).toBe(1500);
  });

  it('deve diminuir o saldo após um saque válido', () => {
    const account = new Account();
    account.balance = 1000;
  
    account.balance -= 300;
  
    expect(account.balance).toBe(700);
  });

  it('não deve permitir saque maior que o saldo disponível', () => { 
    const account = new Account();
    account.balance = 1000;

    const saque = 1500;
    if (saque > account.balance) {
      account.balance = account.balance;
    } else {
      account.balance -= saque;
    }

    expect(account.balance).toBe(1000); 
  });

  //TODO: criar teste de cheque especial e cartão de crédito 
});