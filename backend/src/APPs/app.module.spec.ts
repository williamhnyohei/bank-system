import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../Modules/users/user.module';
import { UserService } from '../Modules/users/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_bank } from '../Modules/users/user.entity';

describe('AppModule', () => {
  let app: INestApplication;
  let userService = { findAll: () => ['test'] };
  let userRepository: Partial<Repository<User_bank>>;

  beforeAll(async () => {
    userRepository = {
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .overrideProvider(getRepositoryToken(User_bank)) // Mock do repositório
      .useValue(userRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(userService.findAll());
  });  

  afterAll(async () => {
    await app.close();
  });
});
