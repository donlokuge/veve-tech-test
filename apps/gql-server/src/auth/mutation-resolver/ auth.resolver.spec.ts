import { Test, TestingModule } from '@nestjs/testing';

import { AuthResolver } from './auth.resolver';
import { AuthService } from '../services/auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: { signIn: jest.fn() },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const input = { username: 'test', password: 'test' };
      const accessToken = 'testToken';

      jest.spyOn(authService, 'signIn').mockResolvedValue({ accessToken });

      const result = await resolver.login(input);

      expect(result).toEqual({ accessToken });
      expect(authService.signIn).toBeCalledWith(input);
    });
  });
});
