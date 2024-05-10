import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(@InjectConnection() private connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.db.command({ ping: 1 });
      this.logger.log('Connected to MongoDB');
    } catch (error) {
      this.logger.error('Error connecting to MongoDB', error.stack);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}