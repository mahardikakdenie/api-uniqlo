import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { AuthGuard } from './auth.guard';
import { TransformerService } from './transformer.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService, ValidationService, AuthGuard, TransformerService],
  exports: [PrismaService, ValidationService, AuthGuard, TransformerService],
})
export class CommonModule {}
