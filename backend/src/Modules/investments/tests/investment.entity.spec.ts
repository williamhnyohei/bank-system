import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Investment } from '../investment.entity';
import { Account } from '../../accounts/account.entity';

describe('Investment Entity', () => {
  let investmentRepository: Repository<Investment>;

  // Simulação de um banco de dados fake para testar Unique Constraints e criação de dados
  const mockDatabase: Investment[] = [];

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      id: Math.floor(Math.random() * 1000), // Simula um ID único
    })),
    save: jest.fn().mockImplementation(async (investment) => {
      const newInvestment = { ...investment, id: Math.floor(Math.random() * 1000) };
      mockDatabase.push(newInvestment);
      return newInvestment;
    }),
    findOne: jest.fn().mockImplementation((query) => {
        return (
          mockDatabase.find(
            (inv) =>
              inv.assetName === query.where.assetName &&
              inv.account.id === query.where.account.id,
          ) || undefined
        );
      }),
      
    find: jest.fn().mockImplementation(() => mockDatabase),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Investment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    investmentRepository = module.get<Repository<Investment>>(getRepositoryToken(Investment));

    // Resetando o banco de dados fake antes de cada teste
    mockDatabase.length = 0;
  });

  it('should create an investment entity', async () => {
    const investment = new Investment();
    investment.id = 1;
    investment.type = 'Ações';
    investment.assetName = 'AAPL';
    investment.amount = 10;
    investment.pricePerUnit = 150.5;
    investment.totalValue = 1505;
    investment.purchaseDate = new Date();
    investment.account = new Account();

    expect(investment).toBeDefined();
    expect(investment.id).toBe(1);
    expect(investment.type).toBe('Ações');
    expect(investment.assetName).toBe('AAPL');
    expect(investment.amount).toBe(10);
    expect(investment.pricePerUnit).toBe(150.5);
    expect(investment.totalValue).toBe(1505);
    expect(investment.purchaseDate).toBeInstanceOf(Date);
    expect(investment.account).toBeInstanceOf(Account);
  });

  it('should save an investment to the repository', async () => {
    const investmentData = {
      type: 'Renda Fixa',
      assetName: 'Tesouro Selic',
      amount: 20,
      pricePerUnit: 200.5,
      totalValue: 4010,
      purchaseDate: new Date(),
      account: new Account(),
    };

    const savedInvestment = await investmentRepository.save(investmentData);

    expect(savedInvestment).toHaveProperty('id');
    expect(savedInvestment.type).toBe('Renda Fixa');
    expect(savedInvestment.assetName).toBe('Tesouro Selic');
    expect(savedInvestment.amount).toBe(20);
    expect(savedInvestment.pricePerUnit).toBe(200.5);
    expect(savedInvestment.totalValue).toBe(4010);
    expect(savedInvestment.account).toBeInstanceOf(Account);
  });

  it('should find all investments', async () => {
    await investmentRepository.save({
      type: 'Ações',
      assetName: 'PETR4',
      amount: 50,
      pricePerUnit: 25.4,
      totalValue: 1270,
      purchaseDate: new Date(),
      account: new Account(),
    });

    await investmentRepository.save({
      type: 'Fundos',
      assetName: 'XPTO11',
      amount: 30,
      pricePerUnit: 100,
      totalValue: 3000,
      purchaseDate: new Date(),
      account: new Account(),
    });

    const investments = await investmentRepository.find();
    expect(investments.length).toBe(2);
  });

  it('should find an investment by asset name and account', async () => {
    const account = new Account();
    account.id = 1;

    await investmentRepository.save({
      type: 'Ações',
      assetName: 'MGLU3',
      amount: 100,
      pricePerUnit: 10.5,
      totalValue: 1050,
      purchaseDate: new Date(),
      account: account,
    });

    const foundInvestment = await investmentRepository.findOne({
      where: { assetName: 'MGLU3', account: { id: 1 } },
    });

    expect(foundInvestment).toBeDefined();
    if (foundInvestment) {
      expect(foundInvestment.assetName).toBe('MGLU3');
      expect(foundInvestment.amount).toBe(100);
    }
  });

  it('should not find a non-existing investment', async () => {
    const foundInvestment = await investmentRepository.findOne({
      where: { assetName: 'INVALIDO', account: { id: 1 } },
    });

    expect(foundInvestment).toBeUndefined();
  });
});
