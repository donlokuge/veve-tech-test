import { InputType, Field } from '@nestjs/graphql';
import { WalletAddress } from '../../../common/types/wallet.type';
import { WalletScalar } from '../../scalars/wallet.scalars';

@InputType()
export class WalletInput {
  @Field(() => WalletScalar)
  walletAddress: WalletAddress;
}
