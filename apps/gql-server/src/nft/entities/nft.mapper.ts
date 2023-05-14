import { WalletAddress } from '../../common/types/wallet.type';
import { NFTType } from '../nft.types';
import { NFT } from './nft.entity';

export const NFTMapper = {
  mapFrom: (input: NFT): NFTType => {
    return {
      ...input,
      owner: input.owner as WalletAddress,
    };
  },

  mapTo: (output: NFTType): NFT => {
    return {
      ...output,
    };
  },
};
