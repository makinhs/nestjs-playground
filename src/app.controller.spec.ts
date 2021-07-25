import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';
import { connections } from 'mongoose';

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
      imports: [MongooseModule.forRoot(MONGODB_URL, { ...MONGODB_OPTIONS })],
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
    // await app.close();
  });
});
