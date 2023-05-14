import { Field, ObjectType } from '@nestjs/graphql';

import { WalletAddress } from '../common/types/wallet.type';
import { WalletScalar } from './scalars/wallet.scalars';

@ObjectType('NFT')
export class NFTType {
  id: number;

  @Field()
  name: string;

  @Field()
  blockchainLink: string;

  @Field()
  description: string;

  @Field()
  imageUrl: string;

  @Field(() => WalletScalar)
  owner: WalletAddress;

  @Field()
  mintDate: string;
}
