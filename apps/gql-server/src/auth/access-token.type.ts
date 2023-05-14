import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AccessToken')
export class AccessToken {
  @Field()
  accessToken: string;
}
