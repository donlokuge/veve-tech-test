import { Test, TestingModule } from '@nestjs/testing';
import { NFTQueryResolver } from './nft.resolver';
import { NftService } from '../services/nft/nft.service';
import { NFTType } from '../nft.types';
import { WalletAddress } from '../../common/types/wallet.type';

describe('NFTQueryResolver', () => {
  let resolver: NFTQueryResolver;
  let service: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NFTQueryResolver,
        {
          provide: NftService,
          useValue: {
            getNFTByWalletAddress: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<NFTQueryResolver>(NFTQueryResolver);
    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUserNFTs', () => {
    it('should return NFTs for a wallet address', async () => {
      const nft = new NFTType();

      const walletInput = {
        walletAddress:
          '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' as WalletAddress,
      };
      const paging = { limit: 10, offset: 0 };

      jest.spyOn(service, 'getNFTByWalletAddress').mockResolvedValue([nft]);

      const result = await resolver.getUserNFTs(walletInput, paging);

      expect(result).toEqual([nft]);
      expect(service.getNFTByWalletAddress).toHaveBeenCalledWith(
        walletInput.walletAddress,
        paging
      );
    });
  });
});
