import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthInput {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;
}
