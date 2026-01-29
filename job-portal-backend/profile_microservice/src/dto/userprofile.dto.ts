import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field() userId: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) dateOfBirth?: Date;
  @Field({ nullable: true }) gender?: string;
  @Field({ nullable: true }) address?: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) country?: string;
  @Field({ nullable: true }) bio?: string;
  @Field({ nullable: true }) profilePicture?: string;
}

@InputType()
export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {
  @Field() id: string;
}
