import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftModule } from '../nft/nft.module';
import { NFT } from '../nft/entities/nft.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/entities/user.entity';
import { SeedService } from '../seed/seed.service';
import { UserService } from '../auth/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'veve_mysql_database',
      username: 'test', // FIX:: Get from somewhere secure
      password: 'test', // FIX:: Get from somewhere secure
      entities: [NFT, User],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    NftModule,
    AuthModule,
    TypeOrmModule.forFeature([NFT, User]),
  ],
  controllers: [],
  providers: [SeedService, UserService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seed();
  }
}
