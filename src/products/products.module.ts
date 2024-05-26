import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { JwtService } from '@nestjs/jwt';
import { TransformerService } from 'src/common/transformer.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    ValidationService,
    JwtService,
    TransformerService,
  ],
})
export class ProductsModule {}
