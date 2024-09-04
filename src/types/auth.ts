import { User } from '@/entities/user.entity';

export type JwtPayload = Pick<User, 'id' | 'email'>;
