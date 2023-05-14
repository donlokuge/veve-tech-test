import { Test, TestingModule } from '@nestjs/testing';
import { NFTMutationResolver } from './nft-mutation.resolver';
import { NftService } from '../services/nft/nft.service';
import { NFTType } from '../nft.types';
import { WalletAddress } from '../../common/types/wallet.type';

describe('NFTMutationResolver', () => {
  let resolver: NFTMutationResolver;
  let service: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NFTMutationResolver,
        {
          provide: NftService,
          useValue: {
            transferNFT: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<NFTMutationResolver>(NFTMutationResolver);
    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('transferNFT', () => {
    it('should transfer NFT', async () => {
      const nft = new NFTType();
      // Set any properties of nft here if needed
      const input = {
        id: 1,
        owner: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' as WalletAddress,
        newOwner: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' as WalletAddress,
      };

      jest.spyOn(service, 'transferNFT').mockResolvedValue(nft);

      const result = await resolver.transferNFT(input);

      expect(result).toEqual(nft);
      expect(service.transferNFT).toHaveBeenCalledWith(
        input.id,
        input.owner,
        input.newOwner
      );
    });
  });
});
