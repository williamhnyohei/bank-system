import { Transaction } from '../transaction.entity';
import { validate } from 'class-validator';

describe('Transaction Entity', () => {
  it('deve criar uma transação válida', async () => {
    const transaction = new Transaction();
    transaction.id = 1;
    transaction.amount = 500;
    transaction.type = 'deposit';

    const errors = await validate(transaction);
    expect(errors.length).toBe(0);
  });

  it('deve criar uma transação de saque válida', async () => {
    const transaction = new Transaction();
    transaction.id = 2;
    transaction.amount = 200;
    transaction.type = 'withdraw';

    const errors = await validate(transaction);
    expect(errors.length).toBe(0);
  });

  it('deve criar uma transação de transferência válida', async () => {
    const transaction = new Transaction();
    transaction.id = 3;
    transaction.amount = 300;
    transaction.type = 'transfer';

    const errors = await validate(transaction);
    expect(errors.length).toBe(0);
  });

  it('não deve permitir uma transação com valor negativo', async () => {
    const transaction = new Transaction();
    transaction.id = 4;
    transaction.amount = -100;
    transaction.type = 'deposit';

    const errors = await validate(transaction);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('não deve permitir um tipo de transação inválido', async () => {
    const transaction = new Transaction();
    transaction.id = 5;
    transaction.amount = 100;
    transaction.type = 'invalidType' as any; // Simula um tipo inválido

    const errors = await validate(transaction);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('não deve permitir uma transação com valor zero', async () => {
    const transaction = new Transaction();
    transaction.id = 6;
    transaction.amount = 0;
    transaction.type = 'deposit';

    const errors = await validate(transaction);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve permitir transações com valores altos', async () => {
    const transaction = new Transaction();
    transaction.id = 8;
    transaction.amount = 1000000;
    transaction.type = 'deposit';

    const errors = await validate(transaction);
    expect(errors.length).toBe(0);
    expect(transaction.amount).toBe(1000000);
  });
});