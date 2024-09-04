import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers[process.env.JWT_ACCESS_HEADER_NAME];

    if (!accessToken) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    try {
      const payload = await this.authService.verifyAccessToken(accessToken);
      request['user'] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
  }
}
