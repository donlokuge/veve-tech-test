import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

import { WalletAddress } from '../../common/types/wallet.type';

@Scalar('WalletAddress')
export class WalletScalar implements CustomScalar<string, WalletAddress> {
  description = 'WalletAddress scalar type representing an Ethereum address';

  parseValue(value: string): WalletAddress {
    if (isEthereumAddress(value)) {
      return value as WalletAddress;
    }
    throw new Error('Invalid Ethereum address');
  }

  serialize(value: WalletAddress): string {
    if (typeof value !== 'string') {
      throw new TypeError('WalletAddress must be a string');
    }
    return value;
  }

  parseLiteral(ast: ValueNode): WalletAddress {
    if (ast.kind === Kind.STRING) {
      if (isEthereumAddress(ast.value)) {
        return ast.value as WalletAddress;
      }
    }
    throw new Error('Invalid Ethereum address');
  }
}

//TODO:: MAKE Better
function isEthereumAddress(address: string): boolean {
  const re = /^0x[a-fA-F0-9]{40}$/;
  return re.test(address);
}
