import { registerEnumType } from '@nestjs/graphql';
import {
  LanguageProficiency,
  SkillLevel,
  SocialLinkPlatform,
} from '@prisma/client';

registerEnumType(LanguageProficiency, {
  name: 'LanguageProficiency',
});

registerEnumType(SkillLevel, {
  name: 'SkillLevel',
});

registerEnumType(SocialLinkPlatform, {
  name: 'SocialLinkPlatform',
});
