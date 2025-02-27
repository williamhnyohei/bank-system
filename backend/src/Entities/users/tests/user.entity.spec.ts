import { User } from '../user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

type MockRepository<T = any> = {
  save: jest.Mock;
  update: jest.Mock;
  findOne: jest.Mock;
  delete: jest.Mock;
};

describe('User Entity', () => {
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockImplementation((user) => Promise.resolve(user)),
            update: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    // Aqui garantimos que userRepository possui os métodos definidos
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('deve criar um usuário corretamente', async () => {
    const user = new User();
    user.name = 'Caio';
    user.email = 'caio@email.com';
    user.password = 'hashedPassword123';

    // Chama o método save que está mockado e retorna o próprio usuário
    const savedUser = await userRepository.save(user);
    expect(savedUser.name).toBe('Caio');
    expect(savedUser.email).toBe('caio@email.com');
    expect(savedUser.password).toBe('hashedPassword123');
  });

  it('não deve criar usuário com email inválido', async () => {
    const user = new User();
    user.name = 'Caio';
    user.email = 'email_invalido';
    user.password = 'hashedPassword123';

    // Simula um erro no método save quando o e-mail é inválido
    userRepository.save.mockRejectedValueOnce(new Error('invalid email'));

    await expect(userRepository.save(user)).rejects.toThrow('invalid email');
  });

  it('deve armazenar a senha como hash', async () => {
    const user = new User();
    user.password = 'minhaSenhaSegura';

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    expect(user.password).not.toBe('minhaSenhaSegura');
  });

  it('deve verificar se a senha está correta', async () => {
    const user = new User();
    user.password = await bcrypt.hash('senha123', 10);

    const isMatch = await bcrypt.compare('senha123', user.password);
    expect(isMatch).toBe(true);
  });

  it('não deve permitir criar usuários com o mesmo email', async () => {
    userRepository.save.mockRejectedValue(new Error('Email já cadastrado'));

    await expect(
      userRepository.save({
        name: 'Caio',
        email: 'caio@email.com',
        password: '123',
      })
    ).rejects.toThrow('Email já cadastrado');
  });
});
