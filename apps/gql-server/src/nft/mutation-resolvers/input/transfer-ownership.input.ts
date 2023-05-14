import { InputType, Field, Int } from '@nestjs/graphql';

import { WalletAddress } from '../../../common/types/wallet.type';
import { IsPositive, MinLength } from 'class-validator';

@InputType()
export class TransferNFTInput {
  @Field(() => Int)
  @MinLength(1)
  @IsPositive()
  id: number;

  @Field(() => String)
  owner: WalletAddress;

  @Field(() => String)
  newOwner: WalletAddress;
}
