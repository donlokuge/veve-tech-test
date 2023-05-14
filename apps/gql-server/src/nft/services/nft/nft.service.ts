import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { NFT } from '../../entities/nft.entity';
import { NFTType } from '../../nft.types';
import { WalletAddress } from '../../../common/types/wallet.type';
import { Pagination } from '../../dto/pagination';
import { NFTMapper } from '../../entities/nft.mapper';

@Injectable()
export class NftService {
  constructor(@InjectRepository(NFT) private nftRepository: Repository<NFT>) {}

  /**
   *
   * @param id
   * @param walletAddress
   * @returns
   */
  async transferNFT(
    id: number,
    owner: WalletAddress,
    newOwner: WalletAddress
  ): Promise<NFTType> {
    const nft = await this.nftRepository.findOne({
      where: { id, owner },
    });

    if (!nft) {
      throw new Error('Not found');
    }

    nft.owner = newOwner;
    const updatedNft = await this.nftRepository.save(nft);
    return NFTMapper.mapFrom(updatedNft);
  }

  async getNFTByWalletAddress(
    walletAddress: WalletAddress,
    paging: Pagination
  ): Promise<NFTType[]> {
    const nfts = await this.nftRepository.find({
      where: { owner: walletAddress },
      take: paging.limit,
      skip: paging.offset,
    });
    return nfts.map((nft) => NFTMapper.mapFrom(nft));
  }
}
