import { Args, Query, Resolver } from '@nestjs/graphql';
import { NFTType } from '../nft.types';

import { Pagination } from '../dto/pagination';
import { WalletInput } from './input/walletInput.input';
import { NftService } from '../services/nft/nft.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Resolver((_of) => NFTType)
export class NFTQueryResolver {
  constructor(private nftService: NftService) {}

  @Query((_returns) => [NFTType])
  @UseGuards(JwtAuthGuard)
  async getUserNFTs(
    @Args('walletInput') walletInput: WalletInput,
    @Args('paging') paging: Pagination
  ) {
    return this.nftService.getNFTByWalletAddress(
      walletInput.walletAddress,
      paging
    );
  }
}
