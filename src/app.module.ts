import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { PrismaService } from './common/prisma.module';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
