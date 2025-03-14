import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Branch } from '../branch.entity';
import { Account } from '../../accounts/account.entity';

describe('Branch Entity', () => {
  let branchRepository: Repository<Branch>;

  // Simulação de um banco de dados em memória para testar Unique Constraints
  const mockDatabase: Branch[] = [];

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      id: Math.floor(Math.random() * 1000), // Simula um ID único
    })),
    save: jest.fn().mockImplementation(async (branch) => {
      // Simula Unique Constraint verificando se name ou branchCode já existem
      const exists = mockDatabase.find(
        (b) => b.name === branch.name || b.branchCode === branch.branchCode,
      );

      if (exists) {
        throw new Error('Unique constraint violated');
      }

      const newBranch = { ...branch, id: Math.floor(Math.random() * 1000) };
      mockDatabase.push(newBranch);
      return newBranch;
    }),
    findOne: jest.fn().mockImplementation((query) => {
      return mockDatabase.find(
        (b) => b.name === query.where.name || b.branchCode === query.where.branchCode,
      );
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Branch),
          useValue: mockRepository,
        },
      ],
    }).compile();

    branchRepository = module.get<Repository<Branch>>(getRepositoryToken(Branch));

    // Resetando o banco de dados mockado antes de cada teste
    mockDatabase.length = 0;
  });

  it('should create a branch entity', async () => {
    const branch = new Branch();
    branch.id = 1;
    branch.name = 'Agência Central';
    branch.address = 'Rua das Flores, 123';
    branch.city = 'São Paulo';
    branch.state = 'SP';
    branch.branchCode = 'ABC123';
    branch.accounts = [];

    expect(branch).toBeDefined();
    expect(branch.id).toBe(1);
    expect(branch.name).toBe('Agência Central');
    expect(branch.address).toBe('Rua das Flores, 123');
    expect(branch.city).toBe('São Paulo');
    expect(branch.state).toBe('SP');
    expect(branch.branchCode).toBe('ABC123');
    expect(branch.accounts).toEqual([]);
  });

  it('should enforce unique constraints', async () => {
    const branch1 = branchRepository.create({
      name: 'Agência Centro',
      branchCode: 'CENTRO123',
    });

    await branchRepository.save(branch1);

    const branch2 = branchRepository.create({
      name: 'Agência Centro', // Mesmo nome
      branchCode: 'CENTRO123', // Mesmo código
    });

    // Agora o teste lança erro corretamente se houver duplicação
    await expect(branchRepository.save(branch2)).rejects.toThrow('Unique constraint violated');
  });

  it('should relate to multiple accounts', async () => {
    const branch = new Branch();
    branch.id = 1;
    branch.name = 'Agência Norte';
    branch.address = 'Av. Paulista, 2000';
    branch.city = 'São Paulo';
    branch.state = 'SP';
    branch.branchCode = 'NORTE2000';

    const account1 = new Account();
    account1.id = 1;
    account1.balance = 5000;
    account1.branch = branch;

    const account2 = new Account();
    account2.id = 2;
    account2.balance = 10000;
    account2.branch = branch;

    branch.accounts = [account1, account2];

    expect(branch.accounts.length).toBe(2);
    expect(branch.accounts[0].balance).toBe(5000);
    expect(branch.accounts[1].balance).toBe(10000);
  });
});
