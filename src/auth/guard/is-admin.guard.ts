import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserModel } from '../../_utils/model';

@Injectable()
export class IsAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserModel = request.user;

    return user.user_role === 'admin';
  }
}
