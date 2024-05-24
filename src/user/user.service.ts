import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  I_LOGINREQUEST,
  RegisterUserRequest,
  I_USER_RESPONSE,
} from 'src/model/user.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
// import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterUserRequest): Promise<I_USER_RESPONSE> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);
    const registerUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );

    registerUserRequest.password = await bcrypt.hash(
      registerUserRequest.password,
      10,
    );

    const user = await this.prismaService.user.create({
      data: registerUserRequest,
    });

    return user;
  }

  async login(request: I_LOGINREQUEST): Promise<{ access_token: string }> {
    const loginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findFirst({
      where: {
        email: loginUserRequest.email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Your Credential is not valid', 401);
    }

    return {
      access_token: this.jwtService.sign({ id: user?.id, email: user?.email }),
    };
  }
}
