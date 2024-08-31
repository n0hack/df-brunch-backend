import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { User } from '@/entities/user.entity';

export class RegisterDto extends PickType(User, ['email', 'adventureName']) {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  adventureName: string;
}
