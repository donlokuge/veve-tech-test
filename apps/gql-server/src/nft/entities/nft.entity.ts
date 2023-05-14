import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nfts' })
export class NFT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  blockchainLink: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  owner: string;

  @Column()
  mintDate: string;
}
