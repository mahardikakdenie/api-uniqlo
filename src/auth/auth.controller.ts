import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { ErrorFilter } from 'src/common/error.filter';
import { TransformerService } from 'src/common/transformer.service';
import {
  I_LOGINREQUEST,
  I_METARESPONSE,
  I_USER_ACCESS_TOKEN,
} from 'src/model/user.model';
import { I_WEBRESPONSE } from 'src/model/web.model';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private json: TransformerService<I_USER_ACCESS_TOKEN>,
    private auth: AuthService,
  ) {}

  @Post('login')
  @UseFilters(ErrorFilter)
  @HttpCode(200)
  async login(
    @Body() request: I_LOGINREQUEST,
  ): Promise<I_WEBRESPONSE<I_USER_ACCESS_TOKEN, I_METARESPONSE>> {
    const result: I_USER_ACCESS_TOKEN = await this.auth?.login(request);
    return this.json?.response(result, 'success');
  }
}
