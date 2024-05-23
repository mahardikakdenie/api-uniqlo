import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TransformerService } from './common/transformer.service';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [],
  providers: [TransformerService],
})
export class AppModule {}
