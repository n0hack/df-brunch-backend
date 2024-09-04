import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Provider } from '@/types/user';

export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(data: Pick<User, 'email' | 'hashedPassword' | 'adventureName' | 'provider'>) {
    const newUser = await this.userRepository.create(data);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepository.update(id, data);

    return this.findById(id);
  }

  async count() {
    return this.userRepository.count({ where: { provider: Provider.LOCAL } });
  }
}
