import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CertificationResolver } from './resolver/cerificate.resolver';
import { CompanyProfileResolver } from './resolver/company-profile.resolver';
import { EducationResolver } from './resolver/education.resolver';
import { ExperienceResolver } from './resolver/experience.resolver';
import { HobbyResolver } from './resolver/hobby.resolver';
import { LanguageResolver } from './resolver/language.resolver';
import { ProjectResolver } from './resolver/project.resolver';
import { SkillResolver } from './resolver/skill.resolver';
import { SocialLinkResolver } from './resolver/socilalink.resolver';
import { UserProfileResolver } from './resolver/user-profile.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
        },
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CompanyProfileResolver,
    CertificationResolver,
    EducationResolver,
    ExperienceResolver,
    HobbyResolver,
    LanguageResolver,
    ProjectResolver,
    SkillResolver,
    SocialLinkResolver,
    UserProfileResolver,
    PrismaService,
  ],
})
export class AppModule {}
