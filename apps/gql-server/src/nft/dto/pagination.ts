import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class Pagination {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number;

  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(50)
  limit: number;
}
