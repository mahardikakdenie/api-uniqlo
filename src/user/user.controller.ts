import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequest, I_USER_RESPONSE } from 'src/model/user.model';
import { TransformerService } from 'src/common/transformer.service';
import { I_META, I_WEBRESPONSE } from 'src/model/web.model';
import { ErrorFilter } from 'src/common/error.filter';

@Controller('v1/auth')
export class UserController {
  constructor(
    private userService: UserService,
    private transformer: TransformerService<I_USER_RESPONSE>,
  ) {}

  @Post('register')
  @HttpCode(200)
  @UseFilters(ErrorFilter)
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<I_WEBRESPONSE<I_USER_RESPONSE, I_META>> {
    const result = await this.userService.register(request);
    return this.transformer.response(result, 'success');
  }

  @Post('login')
  @HttpCode(200)
  @UseFilters(ErrorFilter)
  async login(
    @Body() request: RegisterUserRequest,
  ): Promise<I_WEBRESPONSE<I_USER_RESPONSE, I_META>> {
    const result = await this.userService.login(request);
    return this.transformer.response(result, 'success');
  }
}
