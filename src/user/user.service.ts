import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserRequest, I_USER_RESPONSE } from 'src/model/user.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
// import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { I_COMMON_QUERY } from 'src/model/query.module';

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

  async getUsers(request?: I_COMMON_QUERY): Promise<I_USER_RESPONSE[]> {
    const users = await this.prismaService.user.findMany({
      skip: request.skip,
      take: request.take,
    });
    return users;
  }

  async getMe(userId: number): Promise<I_USER_RESPONSE> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
