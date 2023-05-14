import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NftService } from './nft.service';
import { NFT } from '../../entities/nft.entity';
import { Repository } from 'typeorm';
import { WalletAddress } from '../../../common/types/wallet.type';

describe('NftService', () => {
  let service: NftService;
  let repo: Repository<NFT>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NftService,
        {
          provide: getRepositoryToken(NFT),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NftService>(NftService);
    repo = module.get<Repository<NFT>>(getRepositoryToken(NFT));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('transferNFT', () => {
    it('should transfer NFT', async () => {
      const nft = new NFT();
      nft.id = 1;
      nft.name = 'Test NFT';
      nft.blockchainLink = 'http://blockchain.link';
      nft.description = 'Test description';
      nft.imageUrl = 'http://image.url';
      nft.mintDate = new Date().toISOString();
      nft.owner = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

      jest.spyOn(repo, 'findOne').mockResolvedValue(nft);
      jest
        .spyOn(repo, 'save')
        .mockImplementation(async (entity) => entity as NFT);

      const result = await service.transferNFT(
        1,
        '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' as WalletAddress,
        '0xBb5801a7D398351b8bE11C439e05C5B3259aeC9B' as WalletAddress
      );

      expect(result).toBeDefined();
      expect(result.owner).toEqual(
        '0xBb5801a7D398351b8bE11C439e05C5B3259aeC9B'
      );
    });
  });

  describe('getNFTByWalletAddress', () => {
    it('should return NFTs for a wallet address', async () => {
      const nft = new NFT();
      nft.id = 1;
      nft.owner = 'ownerAddress';

      jest.spyOn(repo, 'find').mockResolvedValue([nft]);

      const result = await service.getNFTByWalletAddress(
        '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' as WalletAddress,
        {
          limit: 10,
          offset: 0,
        }
      );

      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(1);
    });
  });
});
