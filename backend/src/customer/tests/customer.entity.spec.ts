import { Customer } from '../customer.entity';
import { User } from '../../users/user.entity';
import { Account } from '../../accounts/account.entity';

describe('Customer Entity', () => {
  it('deve criar um cliente válido', () => {
    const customer = new Customer();
    customer.cpf = '123.456.789-00';
    customer.address = 'Rua Exemplo, 123';
    customer.phoneNumber = '(11) 99999-9999';

    const user = new User();
    customer.user = user;

    const account = new Account();
    customer.accounts = [account];

    expect(customer).toBeDefined();
    expect(customer.cpf).toBe('123.456.789-00');
    expect(customer.accounts.length).toBe(1);
  });
});
