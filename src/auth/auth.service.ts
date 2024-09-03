import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Provider } from '@/types/user';
import { UserService } from '@/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { email, password, adventureName } = dto;

    if (await this.userService.findByEmail(email)) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    return await this.userService.create({
      email,
      adventureName,
      hashedPassword: await argon2.hash(password),
      provider: Provider.LOCAL,
    });
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.findByEmail(email);

    if (!user || !(await argon2.verify(user.hashedPassword, password))) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      user,
      accessToken,
    };
  }

  async approveNewUser(id: number) {
    if (!(await this.userService.findById(id))) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const user = await this.userService.findById(id);
    if (user.isAapproved) {
      throw new BadRequestException('이미 승인된 사용자입니다.');
    }

    return this.userService.update(id, { isAapproved: true });
  }
}
