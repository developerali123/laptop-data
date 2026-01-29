import { InputType, Field, PartialType } from '@nestjs/graphql';
import { LanguageProficiency } from '@prisma/client';

@InputType()
export class CreateLanguageInput {
  @Field() userProfileId: string;
  @Field() name: string;
  @Field(() => LanguageProficiency) proficiency: LanguageProficiency;
}
@InputType()
export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {
  @Field() id: string;
}
