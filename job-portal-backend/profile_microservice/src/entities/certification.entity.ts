import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Certification {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field() name: string;
  @Field() issuer: string;
  @Field(() => String, { nullable: true }) dateIssued?: Date | null;
  @Field(() => String, { nullable: true }) credentialUrl?: string | null;
}
