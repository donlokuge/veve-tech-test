import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { AuthInput } from '../dto/auth-input.dto';
import { JWTPayload } from '../../common/types/jwt-payload';
import { AccessToken } from '../access-token.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(input: AuthInput): Promise<AccessToken> {
    const { username, password } = input;
    const user = await this.userService.findByUserName(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = { sub: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
