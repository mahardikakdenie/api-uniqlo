import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TransformerService } from './common/transformer.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CommonModule, AuthModule],
  controllers: [],
  providers: [TransformerService],
})
export class AppModule {}
