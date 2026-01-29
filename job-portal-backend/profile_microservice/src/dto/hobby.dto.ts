import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateHobbyInput {
  @Field() userProfileId: string;
  @Field() name: string;
}
@InputType()
export class UpdateHobbyInput extends PartialType(CreateHobbyInput) {
  @Field() id: string;
}
