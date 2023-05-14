import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from '../services/auth.service';
import { AuthInput } from '../dto/auth-input.dto';
import { AccessToken } from '../access-token.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(@Args('input') input: AuthInput) {
    return await this.authService.signIn(input);
  }
}
