import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<User>>> = {
      create: jest.fn(),
      save: jest.fn(),
      findBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<jest.Mocked<Repository<User>>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const input = { username: 'test', password: 'test' };
      const user = new User();
      user.username = input.username;
      user.password = await bcrypt.hash(input.password, await bcrypt.genSalt());
      user.role = UserRole.ADMIN;

      jest.spyOn(repo, 'create').mockReturnValue(user);
      jest.spyOn(repo, 'save').mockResolvedValue(user);

      await service.createUser(input);

      expect(repo.create).toBeCalledWith({
        username: input.username,
        password: expect.any(String),
        role: 'admin',
      });
      expect(repo.save).toBeCalledWith(user);
    });

    it('should throw an error if the username already exists', async () => {
      const input = { username: 'test', password: 'test' };
      const error = new Error('Username already exists');

      jest.spyOn(repo, 'save').mockRejectedValue(error);

      await expect(service.createUser(input)).rejects.toThrow(
        'Username already exists'
      );
    });
  });

  describe('findByUserName', () => {
    it('should find a user by username', async () => {
      const user = new User();
      user.username = 'test';

      jest.spyOn(repo, 'findBy').mockResolvedValue([user]);

      const result = await service.findByUserName(user.username);

      expect(result).toEqual(user);
      expect(repo.findBy).toBeCalledWith({ username: user.username });
    });
  });
});
