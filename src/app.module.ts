import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  reconnectTries: 10, // Retry up to 10 times
  reconnectInterval: 500, // Reconnect every 500ms
}


@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL, { ...MONGODB_OPTIONS })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
