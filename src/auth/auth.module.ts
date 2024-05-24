import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ValidationService } from 'src/common/validation.service';
import { PrismaService } from 'src/common/prisma.service';
import { TransformerService } from 'src/common/transformer.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    ValidationService,
    PrismaService,
    TransformerService,
    AuthGuard,
  ],
  exports: [AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
