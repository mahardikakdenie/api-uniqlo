import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequest, I_USER_RESPONSE } from 'src/model/user.model';
import { TransformerService } from 'src/transformer/transformer.service';
import { I_META, I_WEBRESPONSE } from 'src/model/web.model';

@Controller('v1/user')
export class UserController {
  constructor(
    private userService: UserService,
    private transformer: TransformerService<I_USER_RESPONSE>,
  ) {}

  @Post('register')
  @HttpCode(200)
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<I_WEBRESPONSE<I_USER_RESPONSE, I_META>> {
    try {
      const result = await this.userService.register(request);
      return this.transformer.response(result, 'success');
    } catch (error) {
      throw this.transformer.exception(error.message);
    }
  }
}
