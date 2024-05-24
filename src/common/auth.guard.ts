import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context?.switchToHttp().getResponse<Response>();
    const auth = this.extractTokenFromHeader(request, response);

    if (!auth) {
    }
    try {
      const payload = auth;
      request['user'] = payload;
    } catch {
      this.executeResponse(response);
    }
    return true;
  }

  private async extractTokenFromHeader(
    request: Request,
    response: Response,
  ): Promise<any | undefined> {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];

    if (type !== 'Bearer') {
      return this.executeResponse(response);
    }

    const dataToken = await this.prismaService.token.findFirst({
      where: {
        token: token,
      },
    });

    if (!dataToken) {
      return this.executeResponse(response);
    }

    const authUser = await this.prismaService.user.findFirst({
      where: {
        tokenId: dataToken?.id,
      },
    });

    if (!authUser) {
      return this.executeResponse(response);
    }

    return authUser;
  }

  private async executeResponse(response: Response): Promise<Response> {
    return response.status(401).json({
      meta: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    });
  }
}
