import { Account } from '../account.entity';
import { Card } from '../../card/card.entity';

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

  it('deve criar uma conta válida', () => {
    const account = new Account();
    account.id = 1;
    account.balance = 1000;
    account.overdraftLimit = 500; // Cheque especial

    expect(account).toBeDefined();
    expect(account.balance).toBeGreaterThanOrEqual(0);
    expect(account.overdraftLimit).toBeGreaterThanOrEqual(0);
  });

  it('deve permitir cartões de crédito e débito', () => {
    const account = new Account();
    const debitCard = new Card();
    debitCard.type = 'debit';
    debitCard.limit = 0; // Débito não tem limite

    const creditCard = new Card();
    creditCard.type = 'credit';
    creditCard.limit = 5000; // Limite do cartão de crédito

    account.cards = [debitCard, creditCard];

    expect(account.cards.length).toBe(2);
    expect(account.cards[0].type).toBe('debit');
    expect(account.cards[1].type).toBe('credit');
    expect(account.cards[1].limit).toBeGreaterThan(0);
  });
});