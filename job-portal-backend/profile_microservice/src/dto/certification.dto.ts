import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCertificationInput {
  @Field() userProfileId: string;
  @Field() name: string;
  @Field() issuer: string;
  @Field({ nullable: true }) dateIssued?: Date;
  @Field({ nullable: true }) credentialUrl?: string;
}
@InputType()
export class UpdateCertificationInput extends PartialType(
  CreateCertificationInput,
) {
  @Field() id: string;
}
