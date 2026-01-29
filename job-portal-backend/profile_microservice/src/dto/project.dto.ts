import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field() userProfileId: string;
  @Field() title: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => [String]) technologies: string[];
  @Field({ nullable: true }) githubUrl?: string;
  @Field({ nullable: true }) liveUrl?: string;
}
@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field() id: string;
}
