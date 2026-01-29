import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import { CreateLanguageInput, UpdateLanguageInput } from 'src/dto/language.dto';
import { Language } from 'src/entities/language.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Language)
  createLanguage(@Args('input') input: CreateLanguageInput): Promise<Language> {
    return this.service.createLanguage(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Language])
  getLanguages(
    @Args('userProfileId') userProfileId: string,
  ): Promise<Language[]> {
    return this.service.findLanguages(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Language)
  getLanguage(@Args('id') id: string): Promise<Language> {
    return this.service.findLanguage(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Language)
  updateLanguage(@Args('input') input: UpdateLanguageInput): Promise<Language> {
    return this.service.updateLanguage(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Language)
  deleteLanguage(@Args('id') id: string): Promise<Language> {
    return this.service.removeLanguage(id);
  }
}
