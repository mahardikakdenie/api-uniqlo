import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TransformerService } from './common/transformer.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UserModule, CommonModule, AuthModule, ProductsModule],
  controllers: [],
  providers: [TransformerService],
})
export class AppModule {}
