import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field() company: string;
  @Field() title: string;
  @Field(() => String, { nullable: true }) location?: string | null;
  @Field() startDate: Date;
  @Field(() => String, { nullable: true }) endDate?: Date | null;
  @Field(() => String, { nullable: true }) description?: string | null;
}
