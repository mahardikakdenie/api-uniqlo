import {
  Controller,
  Get,
  HttpCode,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { I_USER_RESPONSE } from 'src/model/user.model';
import { TransformerService } from 'src/common/transformer.service';
import { I_META, I_WEBRESPONSE } from 'src/model/web.model';
import { ErrorFilter } from 'src/common/error.filter';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/users')
export class UserController {
  constructor(
    private userService: UserService,
    private transformer: TransformerService<I_USER_RESPONSE[]>,
  ) {}

  @Get('/list')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  async getData(): Promise<I_WEBRESPONSE<I_USER_RESPONSE[], I_META>> {
    const users = await this.userService.getUsers({});
    return this.transformer.response(users, 'success');
  }
}
