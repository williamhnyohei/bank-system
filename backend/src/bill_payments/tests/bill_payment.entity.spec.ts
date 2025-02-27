import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillPayment } from '../bill_payment.entity';
import { Account } from '../../accounts/account.entity';

describe('BillPayment Entity', () => {
  let billPaymentRepository: Repository<BillPayment>;

  const mockDatabase: BillPayment[] = [];

  const mockRepository = {
    create: jest.fn().mockImplementation((dto: Partial<BillPayment>) => ({
      ...dto,
      id: Math.floor(Math.random() * 1000),
      description: dto.description || 'Descrição Padrão',
      paymentDate: new Date('2024-01-01'),
    })),
    save: jest.fn().mockImplementation(async (billPayment: Partial<BillPayment>) => {
      const newBillPayment = { 
        ...billPayment, 
        id: Math.floor(Math.random() * 1000),
        description: billPayment.description || 'Descrição Padrão',
        paymentDate: billPayment.paymentDate ? new Date(billPayment.paymentDate) : new Date('2024-01-01'),
      };
      mockDatabase.push({
        id: newBillPayment.id || Math.floor(Math.random() * 1000),
        description: newBillPayment.description || 'Descrição Padrão',
        amount: newBillPayment.amount ?? 0,
        dueDate: newBillPayment.dueDate || new Date(),
        isPaid: newBillPayment.isPaid ?? false,
        paymentDate: newBillPayment.paymentDate || new Date('2024-01-01'),
        account: newBillPayment.account || new Account(),
      });      
      return newBillPayment;
    }),
    findOne: jest.fn().mockImplementation((query) => {
      return (
        mockDatabase.find(
          (bp) =>
            bp.description === query.where.description &&
            bp.account.id === query.where.account.id,
        ) || null
      );
    }),
    find: jest.fn().mockImplementation(() => mockDatabase),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(BillPayment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    billPaymentRepository = module.get<Repository<BillPayment>>(getRepositoryToken(BillPayment));

    mockDatabase.length = 0;
  });

  it('should create a bill payment entity', async () => {
    const billPayment = new BillPayment();
    billPayment.id = 1;
    billPayment.description = 'Conta de Luz';
    billPayment.amount = 150.75;
    billPayment.dueDate = new Date('2024-03-01');
    billPayment.isPaid = false;
    billPayment.paymentDate = new Date('2024-01-01');
    billPayment.account = new Account();

    expect(billPayment).toBeDefined();
    expect(billPayment.id).toBe(1);
    expect(billPayment.description).toBe('Conta de Luz');
    expect(billPayment.amount).toBe(150.75);
    expect(billPayment.dueDate).toBeInstanceOf(Date);
    expect(billPayment.isPaid).toBe(false);
    expect(billPayment.paymentDate).toBeInstanceOf(Date);
    expect(billPayment.account).toBeInstanceOf(Account);
  });

  it('should save a bill payment to the repository', async () => {
    const billPaymentData: Partial<BillPayment> = {
      description: 'Boleto Faculdade',
      amount: 500.0,
      dueDate: new Date('2024-03-10'),
      isPaid: false,
      paymentDate: new Date('2024-01-01'),
      account: new Account(),
    };

    const savedBillPayment = await billPaymentRepository.save(billPaymentData);

    expect(savedBillPayment).toHaveProperty('id');
    expect(savedBillPayment.description).toBe('Boleto Faculdade');
    expect(savedBillPayment.amount).toBe(500.0);
    expect(savedBillPayment.dueDate).toBeInstanceOf(Date);
    expect(savedBillPayment.isPaid).toBe(false);
    expect(savedBillPayment.paymentDate).toBeInstanceOf(Date);
    expect(savedBillPayment.account).toBeInstanceOf(Account);
  });

  it('should find a bill payment by description and account', async () => {
    const account = new Account();
    account.id = 1;

    await billPaymentRepository.save({
      description: 'Aluguel',
      amount: 1800.0,
      dueDate: new Date('2024-03-05'),
      isPaid: false,
      paymentDate: new Date('2024-01-01'),
      account: account,
    });

    const foundBillPayment = await billPaymentRepository.findOne({
      where: { description: 'Aluguel', account: { id: 1 } },
    });

    expect(foundBillPayment).toBeDefined();
    if (foundBillPayment) {
      expect(foundBillPayment.description).toBe('Aluguel');
      expect(foundBillPayment.amount).toBe(1800.0);
    }
  });

  it('should not find a non-existing bill payment', async () => {
    const foundBillPayment = await billPaymentRepository.findOne({
      where: { description: 'Inexistente', account: { id: 1 } },
    });

    expect(foundBillPayment).toBeNull();
  });
});
