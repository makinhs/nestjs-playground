import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection,
    private health: HealthCheckService,
    private postgresDb: TypeOrmHealthIndicator,
    private mongooseDb: MongooseHealthIndicator,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/_status/healthz')
  healthCheck() {
    return this.health.check([
      () => this.postgresDb.pingCheck('postgres'),
      () => this.mongooseDb.pingCheck('mongodb'),
    ]);
  }
}
