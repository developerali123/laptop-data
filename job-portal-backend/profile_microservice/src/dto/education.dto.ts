import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateEducationInput {
  @Field() userProfileId: string;
  @Field() degree: string;
  @Field() school: string;
  @Field({ nullable: true }) field?: string;
  @Field() startDate: Date;
  @Field({ nullable: true }) endDate?: Date;
  @Field({ nullable: true }) grade?: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) obtainedmarks?: number;
  @Field({ nullable: true }) totalmarks?: number;
}

@InputType()
export class UpdateEducationInput extends PartialType(CreateEducationInput) {
  @Field() id: string;
}
