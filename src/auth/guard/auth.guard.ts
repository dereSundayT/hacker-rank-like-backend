import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../_utils/model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const userJwtPayload: UserModel = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    const user = await this.prismaService.user.findFirst({
      where: { id: userJwtPayload.id },
    });

    if (user) {
      request.user = user;
      return true;
    } else {
      return false;
    }
  }

  /**
   * extract token from header
   * @param request
   * @private
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
