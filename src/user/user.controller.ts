import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequest, UserReponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';

@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserReponse>> {
    const result = await this.userService.register(request);

    return {
      data: result,
    };
  }
}
