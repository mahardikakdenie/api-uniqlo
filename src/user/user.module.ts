import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidationService } from 'src/common/validation.service';
import { PrismaService } from 'src/common/prisma.service';
import { TransformerService } from 'src/common/transformer.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    ValidationService,
    PrismaService,
    TransformerService,
  ],
})
export class UserModule {}
