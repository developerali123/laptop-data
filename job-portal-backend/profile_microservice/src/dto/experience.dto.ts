import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateExperienceInput {
  @Field() userProfileId: string;
  @Field() company: string;
  @Field() title: string;
  @Field({ nullable: true }) location?: string;
  @Field() startDate: Date;
  @Field({ nullable: true }) endDate?: Date;
  @Field({ nullable: true }) description?: string;
}
@InputType()
export class UpdateExperienceInput extends PartialType(CreateExperienceInput) {
  @Field() id: string;
}
