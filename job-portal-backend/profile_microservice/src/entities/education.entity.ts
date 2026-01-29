import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Education {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field() degree: string;
  @Field() school: string;
  @Field(() => String, { nullable: true }) field?: string | null;
  @Field() startDate: Date;
  @Field(() => String, { nullable: true }) endDate?: Date | null;
  @Field(() => String, { nullable: true }) grade?: string | null;
  @Field(() => String, { nullable: true }) description?: string | null;
  @Field(() => String, { nullable: true }) obtainedmarks?: number | null;
  @Field(() => String, { nullable: true }) totalmarks?: number | null;
}
