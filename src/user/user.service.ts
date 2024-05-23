import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserRequest, UserReponse } from 'src/model/user.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
  ) {}
  async register(request: RegisterUserRequest): Promise<UserReponse> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);
    const registerUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );

    const totalUserWithSameUsername = await this.prismaService.user.count({
      where: {
        username: request.username,
      },
    });

    if (totalUserWithSameUsername > 0) {
      throw new HttpException('Username already exists', 400);
    }
    registerUserRequest.password = await bcrypt.hash(
      registerUserRequest.password,
      10,
    );

    const user = await this.prismaService.user.create({
      data: registerUserRequest,
    });

    return user;
  }
}
