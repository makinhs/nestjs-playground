import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';
import { connections } from 'mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenvConfig();
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  reconnectTries: 10, // Retry up to 10 times
  reconnectInterval: 500, // Reconnect every 500ms
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule,
        MongooseModule.forRoot(MONGODB_URL, { ...MONGODB_OPTIONS }),
        TypeOrmModule.forRoot({
          keepConnectionAlive: true,
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME || 'root',
          password: process.env.DB_PASSWORD || 'root',
          database: process.env.DB_DATABASE || 'circle-test_test',
          // autoLoadEntities: true,
          // synchronize: true,
          synchronize: !!process.env.DB_SYNCHRONIZE,
          cli: {
            entitiesDir: '**/entities/**/*.entity{.js,.ts}',
          },
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await connections[1].close();
  });
});
