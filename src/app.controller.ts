import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/_status/healthz')
  healthCheck() {
    if (this.connection.readyState === 1) {
      return { db: { status: 'up' } };
    } else {
      throw new HttpException('BAD_GATEWAY', HttpStatus.BAD_GATEWAY);
    }
  }
}
