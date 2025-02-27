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
      amount: dto.amount ?? 100, // Valor padrão para evitar undefined
      dueDate: dto.dueDate || new Date(),
      isPaid: dto.isPaid ?? false,
      paymentDate: dto.paymentDate || new Date('2024-01-01'),
      account: dto.account || new Account(),
    })),
    save: jest.fn().mockImplementation(async (billPayment: Partial<BillPayment>) => {
      const newBillPayment: BillPayment = {
        ...billPayment,
        id: Math.floor(Math.random() * 1000),
        description: billPayment.description || 'Descrição Padrão',
        amount: billPayment.amount ?? 100, // Evita undefined
        dueDate: billPayment.dueDate || new Date(),
        isPaid: billPayment.isPaid ?? false,
        paymentDate: billPayment.paymentDate || new Date('2024-01-01'),
        account: billPayment.account || new Account(),
      };
      mockDatabase.push(newBillPayment);
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

  it('should find all bill payments', async () => {
    await billPaymentRepository.save({
      description: 'Internet',
      amount: 120.0,
      dueDate: new Date('2024-03-15'),
      isPaid: false,
      paymentDate: new Date('2024-01-01'),
      account: new Account(),
    });

    await billPaymentRepository.save({
      description: 'Cartão de Crédito',
      amount: 2000.0,
      dueDate: new Date('2024-03-20'),
      isPaid: true,
      paymentDate: new Date('2024-03-18'),
      account: new Account(),
    });

    const billPayments = await billPaymentRepository.find();
    expect(billPayments.length).toBe(2);
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
