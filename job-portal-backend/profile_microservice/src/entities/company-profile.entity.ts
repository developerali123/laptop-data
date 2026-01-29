import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyProfile {
  @Field()
  id: string;

  @Field()
  companyId: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  logoUrl?: string | null;

  @Field(() => String, { nullable: true })
  industry?: string | null;

  @Field(() => String, { nullable: true })
  website?: string | null;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => Date, { nullable: true })
  establishedDate?: Date | null;

  @Field(() => String, { nullable: true })
  about?: string | null;

  @Field(() => String, { nullable: true })
  size?: string | null;

  @Field(() => String, { nullable: true })
  linkedIn?: string | null;

  @Field(() => String, { nullable: true })
  facebook?: string | null;

  @Field(() => String, { nullable: true })
  twitter?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
