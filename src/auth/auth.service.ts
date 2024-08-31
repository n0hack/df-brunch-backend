import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Provider } from '@/types/user';
import { UserService } from '@/user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
