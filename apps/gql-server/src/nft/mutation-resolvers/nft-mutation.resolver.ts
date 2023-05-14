import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { NFTType } from '../nft.types';
import { TransferNFTInput } from './input/transfer-ownership.input';
import { NftService } from '../services/nft/nft.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Resolver(() => NFTType)
export class NFTMutationResolver {
  constructor(private nftService: NftService) {}

  @Mutation(() => NFTType)
  @UseGuards(JwtAuthGuard)
  async transferNFT(@Args('input') input: TransferNFTInput): Promise<NFTType> {
    const { id, owner, newOwner } = input;
    return this.nftService.transferNFT(id, owner, newOwner);
  }
}
