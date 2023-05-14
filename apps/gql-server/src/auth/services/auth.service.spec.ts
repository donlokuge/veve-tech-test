import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '../entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: { findByUserName: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token for a valid user', async () => {
      const input = { username: 'test', password: 'test' };
      const user: User = {
        id: '12345',
        username: input.username,
        password: await bcrypt.hash(input.password, await bcrypt.genSalt()),
        role: UserRole.ADMIN,
      };
      const payload = { sub: user.id };
      const accessToken = 'testToken';

      jest.spyOn(userService, 'findByUserName').mockResolvedValue(user);

      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

      const result = await service.signIn(input);

      expect(result).toEqual({ accessToken });
      expect(userService.findByUserName).toBeCalledWith(input.username);
      expect(jwtService.sign).toBeCalledWith(payload);
    });

    it('should throw an UnauthorizedException for an invalid user', async () => {
      const input = { username: 'test', password: 'test' };

      jest.spyOn(userService, 'findByUserName').mockResolvedValue(undefined);

      await expect(service.signIn(input)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
