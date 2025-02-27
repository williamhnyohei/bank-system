import { TransactionHistory } from '../history.entity';
import { Account } from '../../accounts/account.entity';
import { TransactionType } from '../../../enum/transactiontype.enum';

describe('TransactionHistory Entity', () => {
  it('deve criar um histórico de transação válido', () => {
    const history = new TransactionHistory();
    history.id = 1;
    history.type = TransactionType.DEPOSIT;
    history.amount = 1000;

    const account = new Account();
    history.account = account;

    expect(history).toBeDefined();
    expect(history.amount).toBeGreaterThan(0);
    expect(history.type).toMatch(/deposit|withdraw|transfer|loan-payment/);
  });
});
