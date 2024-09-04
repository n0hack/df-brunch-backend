import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@/types/user';
import { UserService } from '@/user/user.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGurad implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userSerivce: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = await this.userSerivce.findById(request['user'].id);
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return true;
  }
}
