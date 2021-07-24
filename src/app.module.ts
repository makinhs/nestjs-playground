import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_OPTIONS = {};

let MongooseModule;

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL, { ...MONGODB_OPTIONS })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
