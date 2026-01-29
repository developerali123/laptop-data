import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyProfileInput {
  @Field()
  companyId: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field({ nullable: true })
  industry?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  establishedDate?: Date;

  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  linkedIn?: string;

  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  twitter?: string;
}

@InputType()
export class UpdateCompanyProfileInput extends PartialType(
  CreateCompanyProfileInput,
) {
  @Field()
  id: string;
}
