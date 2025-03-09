import { CreditCard, DebitCard } from '../card.entity';
import { Account } from '../../accounts/account.entity';

describe('Card Entity', () => {
  it('deve criar um cartão de crédito válido', () => {
    const account = new Account();
    account.id = 1;

    const creditCard = new CreditCard();
    creditCard.id = 1;
    creditCard.cardNumber = '1234567812345678';
    creditCard.expirationDate = '12/30';
    creditCard.cvv = '123';
    creditCard.creditLimit = 5000;
    creditCard.account = account;

    expect(creditCard).toBeDefined();
    expect(creditCard.creditLimit).toBeGreaterThan(0);
    expect(creditCard.account.id).toBe(1);
  });

  it('deve criar um cartão de débito válido', () => {
    const account = new Account();
    account.id = 2;

    const debitCard = new DebitCard();
    debitCard.id = 2;
    debitCard.cardNumber = '8765432187654321';
    debitCard.expirationDate = '11/28';
    debitCard.cvv = '456';
    debitCard.overdraftLimit = 1000;
    debitCard.account = account;

    expect(debitCard).toBeDefined();
    expect(debitCard.overdraftLimit).toBeGreaterThanOrEqual(0);
    expect(debitCard.account.id).toBe(2);
  });
});