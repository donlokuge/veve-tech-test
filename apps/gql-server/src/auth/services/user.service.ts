import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthInput } from '../dto/auth-input.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(input: AuthInput): Promise<void> {
    const { username, password } = input;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role: UserRole.ADMIN, // FIX::
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Username already exists');
    }
  }

  async findByUserName(userName: string) {
    return (
      await this.userRepository.findBy({
        username: userName,
      })
    )[0];
  }
}
