import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TransformerService } from './transformer/transformer.service';
import { TransformerModule } from './transformer/transformer.module';

@Module({
  imports: [UserModule, CommonModule, TransformerModule, TransformerModule],
  controllers: [],
  providers: [TransformerService],
})
export class AppModule {}
