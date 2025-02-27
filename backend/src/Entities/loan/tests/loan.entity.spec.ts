import { Loan } from '../loan.entity';
import { Account } from '../../accounts/account.entity';

describe('Loan Entity', () => {
  it('deve criar um empréstimo válido', () => {
    const loan = new Loan();
    loan.id = 1;
    loan.amount = 5000;
    loan.interestRate = 5;
    loan.dueDate = new Date('2025-12-31');

    const account = new Account();
    loan.account = account;

    expect(loan).toBeDefined();
    expect(loan.amount).toBeGreaterThan(0);
    expect(loan.interestRate).toBeGreaterThan(0);
    expect(loan.dueDate).toBeInstanceOf(Date);
  });
});
