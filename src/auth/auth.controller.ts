import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@/types/user';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { RoleGurad } from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('approve-new-user/:id')
  @UseGuards(AuthGuard, RoleGurad)
  @Roles(Role.ADMIN, Role.DEVELOPER)
  approveNewUser(@Param('id') id: number) {
    return this.authService.approveNewUser(id);
  }
}
