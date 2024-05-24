import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { I_LOGINREQUEST } from 'src/model/user.model';
import { UserValidation } from 'src/user/user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly validation: ValidationService,
    private prismaService: PrismaService,
  ) {}
  async login(request: I_LOGINREQUEST): Promise<{ access_token: string }> {
    const userRequest = this.validation.validate(UserValidation.LOGIN, request);

    const user = this.prismaService.user.findUniqueOrThrow({
      where: {
        email: userRequest.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      userRequest.password,
      (await user)?.password,
    );
    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }
    const result = {
      access_token: await this.jwtService.sign({
        id: (await user)?.id,
        email: (await user)?.email,
      }),
    };
    return result;
  }
}
