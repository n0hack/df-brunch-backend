import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { User } from '@/entities/user.entity';

export class LoginDto extends PickType(User, ['email']) {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
