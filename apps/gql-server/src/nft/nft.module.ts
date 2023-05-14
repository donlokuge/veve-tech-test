import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletScalar } from './scalars/wallet.scalars';
import { NftService } from './services/nft/nft.service';
import { NFT } from './entities/nft.entity';
import { NFTQueryResolver } from './query-resolvers/nft.resolver';
import { NFTMutationResolver } from './mutation-resolvers/nft-mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NFT])],
  providers: [NFTQueryResolver, NFTMutationResolver, WalletScalar, NftService],
})
export class NftModule {}
