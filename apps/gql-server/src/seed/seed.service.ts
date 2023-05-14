import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { NFT } from '../nft/entities/nft.entity';
import { UserService } from '../auth/services/user.service';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(NFT)
    private readonly nftRepository: Repository<NFT>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService
  ) {}

  async seed() {
    const owners = [
      '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      '0xBb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    ];

    const nfts = Array.from({ length: 10 }, (_, i) => ({
      name: `NFT ${i + 1}`,
      blockchainLink: faker.internet.url(),
      description: faker.lorem.sentence(),
      imageUrl: faker.image.imageUrl(),
      owner: owners[i % 2],
      mintDate: new Date().toISOString(),
    }));

    await this.nftRepository.clear();

    for (const nft of nfts) {
      await this.nftRepository.save(nft);
    }

    // SETUP USERS
    await this.userRepository.clear();

    await this.userService.createUser({
      password: 'PASSWORD1234',
      username: 'test-user',
    });
  }
}
