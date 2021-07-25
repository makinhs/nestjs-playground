import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { connections } from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/_status/healthz (GET)', () => {
    return request(app.getHttpServer())
      .get('/_status/healthz')
      .expect(200)
      .expect({
        status: 'ok',
        info: { postgres: { status: 'up' }, mongodb: { status: 'up' } },
        error: {},
        details: { postgres: { status: 'up' }, mongodb: { status: 'up' } },
      });
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await connections[1].close();
    await app.close();
  });
});
