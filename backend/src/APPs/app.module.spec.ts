import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../Modules/users/user.module';
import { UserService } from '../Modules/users/user.service';
import { expect } from '@jest/globals';

describe('UserModule', () => {
  let app: INestApplication;
  let userService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
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
      .expect({
        data: userService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});