import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field() title: string;
  @Field(() => String, { nullable: true }) description?: string | null;
  @Field(() => [String]) technologies: string[];
  @Field(() => String, { nullable: true }) githubUrl?: string | null;
  @Field(() => String, { nullable: true }) liveUrl?: string | null;
}
