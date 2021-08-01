import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';

dotenvConfig();

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // reconnectTries: 10, // Retry up to 10 times
  // reconnectInterval: 500, // Reconnect every 500ms
};

@Module({
  imports: [
    TerminusModule,
    MongooseModule.forRoot(MONGODB_URL, { ...MONGODB_OPTIONS }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
})
export class AppModule {}
