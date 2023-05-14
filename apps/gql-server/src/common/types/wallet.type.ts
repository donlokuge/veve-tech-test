export interface WalletAddressBrand {
  readonly WalletAddress: unique symbol;
}

export type WalletAddress = string & WalletAddressBrand;
