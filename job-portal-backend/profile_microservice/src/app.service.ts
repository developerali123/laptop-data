import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Certification,
  Experience,
  Hobby,
  Language,
  Project,
  Skill,
  SocialLink,
} from '@prisma/client';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as FormData from 'form-data';
import { PrismaService } from 'prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import {
  CreateCertificationInput,
  UpdateCertificationInput,
} from './dto/certification.dto';
import {
  CreateCompanyProfileInput,
  UpdateCompanyProfileInput,
} from './dto/companyprofile.dto';
import {
  CreateEducationInput,
  UpdateEducationInput,
} from './dto/education.dto';
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from './dto/experience.dto';
import { CreateHobbyInput, UpdateHobbyInput } from './dto/hobby.dto';
import { CreateLanguageInput, UpdateLanguageInput } from './dto/language.dto';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.dto';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.dto';
import {
  CreateSocialLinkInput,
  UpdateSocialLinkInput,
} from './dto/sociallink.dto';
import {
  CreateUserProfileInput,
  UpdateUserProfileInput,
} from './dto/userprofile.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly client: ClientProxy,
    private readonly prisma: PrismaService,
  ) { }

  validateToken(token: string) {
    return this.client.send('auth.validate-token', token);
  }

  validateCompany(companyId: string): Promise<any> {
    return firstValueFrom(
      this.client.send('auth.validate-company', { companyId }), // ✅ send as object
    );
  }

  async importCv(file: Express.Multer.File, userId: string) {
    const user = await this.validateCompany(userId);
    if (!user) throw new NotFoundException('User not found in Auth service');

    // 1. Send file to Affinda API
    const form = new FormData();
    form.append('file', await fs.readFile(file.path), {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      'https://api.affinda.com/v2/resumes',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer aff_e76112f55d7012c2e132ae96af2e3c89e43607e3`, // Replace this
        },
      },
    );

    const parsed = response.data.data;
    if (!parsed) throw new Error('Parsing failed');

    // 2. Extract & upsert user profile
    const profileData = {
      userId,
      fullName: user.name,
      contactEmail: user.email,
      phone: parsed.phoneNumbers?.[0]?.raw || '',
      dateOfBirth: parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : null,
      address: parsed.location?.formatted || '',
      city: parsed.location?.city || '',
      country: parsed.location?.country || '',
      bio: parsed.summary || '',
    };

    console.log('🧍 Profile:', profileData);

    // ✅ 2. Education
    console.log('🎓 Education:', parsed.education);

    // ✅ 3. Work Experience
    console.log('💼 Work Experience:', parsed.workExperience);

    // ✅ 4. Skills
    console.log('🛠 Skills:', parsed.skills);

    // ✅ 5. Certifications
    console.log('📜 Certifications:', parsed.certifications);

    // ✅ 6. Projects
    console.log('🚀 Projects:', parsed.projects);

    // ✅ 7. Languages
    console.log('🌐 Languages:', parsed.languages);

    // ✅ 8. Social Links
    console.log('🔗 Social Links:', parsed.links);

    // ✅ 9. Hobbies / Interests
    console.log('🎯 Hobbies / Interests:', parsed.interests);

    // const userProfile = await this.prisma.userProfile.upsert({
    //   where: { userId },
    //   update: profileData,
    //   create: profileData,
    // });

    // const uid = userProfile.id;

    // // 🔄 Cleanup old data
    // await Promise.all([
    //   this.prisma.education.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.experience.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.skill.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.certification.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.project.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.language.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.socialLink.deleteMany({ where: { userProfileId: uid } }),
    //   this.prisma.hobby.deleteMany({ where: { userProfileId: uid } }),
    // ]);

    // // 3. Education
    // for (const edu of parsed.education ?? []) {
    //   await this.prisma.education.create({
    //     data: {
    //       userProfileId: uid,
    //       degree: edu.accreditation || 'N/A',
    //       school: edu.organization || 'N/A',
    //       field: edu.fieldOfStudy || '',
    //       startDate: edu.startDate ? new Date(edu.startDate) : undefined,
    //       endDate: edu.endDate ? new Date(edu.endDate) : undefined,
    //       grade: edu.grade || '',
    //     },
    //   });
    // }

    // // 4. Experience
    // for (const job of parsed.workExperience ?? []) {
    //   await this.prisma.experience.create({
    //     data: {
    //       userProfileId: uid,
    //       company: job.organization || 'N/A',
    //       title: job.jobTitle || 'N/A',
    //       location: job.location?.formatted || '',
    //       startDate: job.startDate ? new Date(job.startDate) : undefined,
    //       endDate: job.endDate ? new Date(job.endDate) : undefined,
    //       description: job.jobDescription || '',
    //     },
    //   });
    // }

    // // 5. Skills
    // for (const skill of parsed.skills ?? []) {
    //   await this.prisma.skill.create({
    //     data: {
    //       userProfileId: uid,
    //       name: skill.name,
    //       level: 'INTERMEDIATE', // default
    //     },
    //   });
    // }

    // // 6. Certifications
    // for (const cert of parsed.certifications ?? []) {
    //   await this.prisma.certification.create({
    //     data: {
    //       userProfileId: uid,
    //       name: cert.name || 'N/A',
    //       issuer: cert.authority || 'N/A',
    //       dateIssued: cert.date || null,
    //       credentialUrl: cert.url || '',
    //     },
    //   });
    // }

    // // 7. Projects
    // for (const proj of parsed.projects ?? []) {
    //   await this.prisma.project.create({
    //     data: {
    //       userProfileId: uid,
    //       title: proj.name || 'Untitled',
    //       description: proj.highlights?.join(', ') || '',
    //       technologies: proj.technologies || [],
    //       githubUrl: proj.url || '',
    //       liveUrl: '', // Optional field
    //     },
    //   });
    // }

    // // 8. Languages
    // for (const lang of parsed.languages ?? []) {
    //   await this.prisma.language.create({
    //     data: {
    //       userProfileId: uid,
    //       name: lang.name || 'Unknown',
    //       proficiency: 'INTERMEDIATE', // default if unknown
    //     },
    //   });
    // }

    // // 9. Social Links
    // for (const link of parsed.links ?? []) {
    //   const url = link.url || '';
    //   const platform = url.includes('linkedin')
    //     ? 'LINKENDIN'
    //     : url.includes('facebook')
    //       ? 'FACEBOOK'
    //       : url.includes('instagram')
    //         ? 'INSTAGRAM'
    //         : 'LINKENDIN'; // fallback

    //   await this.prisma.socialLink.create({
    //     data: {
    //       userProfileId: uid,
    //       platform,
    //       url,
    //     },
    //   });
    // }

    // // 10. Hobbies (parsed.interests not always available)
    // for (const hobby of parsed.interests ?? []) {
    //   await this.prisma.hobby.create({
    //     data: {
    //       userProfileId: uid,
    //       name: hobby.name || hobby || 'N/A',
    //     },
    //   });
    // }

    return {
      message: 'CV imported and full profile created/updated',
      name: profileData.fullName,
    };
  }

  private extractField(text: string, field: string): string | null {
    const regex = new RegExp(`${field}:?\\s*(.+)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  }

  async createCompanyProfile(data: CreateCompanyProfileInput) {
    const companyId = data.companyId;
    if (!companyId) throw new BadRequestException('companyId is required');
    const companyprofile = await this.prisma.companyProfile.findUnique({
      where: { companyId: data.companyId },
    });
    if (companyprofile)
      throw new NotFoundException('Company profile already created');
    try {
      const company = await this.validateCompany(companyId);

      if (!company)
        throw new NotFoundException('Company not found in Auth service');

      return this.prisma.companyProfile.create({
        data: {
          ...data,
          companyId: company.companyId,
          name: company.name,
          email: company.email,
        },
      });
    } catch (error) {
      console.error('❌ Error in create method:', error);
      throw error;
    }
  }

  findAllCompanyProfiles() {
    return this.prisma.companyProfile.findMany();
  }

  async findOneCompanyProfile(id: string) {
    const profile = await this.prisma.companyProfile.findUnique({
      where: { id },
    });
    if (!profile) throw new NotFoundException('Company profile not found');
    return profile;
  }

  async updateCompanyProfile(id: string, data: UpdateCompanyProfileInput) {
    await this.findOneCompanyProfile(id);
    return this.prisma.companyProfile.update({
      where: { id },
      data,
    });
  }

  async removeCompanyProfile(id: string) {
    await this.findOneCompanyProfile(id);
    return this.prisma.companyProfile.delete({ where: { id } });
  }

  async createUserProfile(input: CreateUserProfileInput) {
    const userId = input.userId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userId);
    try {
      const user = await this.validateCompany(userId);

      if (!user) throw new NotFoundException('user not found in Auth service');

      return this.prisma.userProfile.create({
        data: {
          ...input,
          userId: user.companyId,
          fullName: user.name,
          contactEmail: user.email,
        },
      });
    } catch (error) {
      console.error('❌ Error in create method:', error);
      throw error;
    }
  }

  async findAllUserProfiles() {
    return this.prisma.userProfile.findMany({
      include: {
        education: true,
        experience: true,
        skills: true,
        certifications: true,
        projects: true,
        languages: true,
        socialLinks: true,
        hobbies: true,
      },
    });
  }

  async findUserProfile(id: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { id },
      include: {
        education: true,
        experience: true,
        skills: true,
        certifications: true,
        projects: true,
        languages: true,
        socialLinks: true,
        hobbies: true,
      },
    });
    if (!profile) throw new NotFoundException('UserProfile not found');
    return profile;
  }

  async findUserProfileByUserId(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      include: {
        education: true,
        experience: true,
        skills: true,
        certifications: true,
        projects: true,
        languages: true,
        socialLinks: true,
        hobbies: true,
      },
    });

    if (profile) throw new NotFoundException('User profile already exist');

    return profile;
  }

  async updateUserProfile(id: string, data: UpdateUserProfileInput) {
    await this.findUserProfile(id);

    return this.prisma.userProfile.update({
      where: { id },
      data,
    });
  }

  async removeUserProfile(id: string) {
    await this.findUserProfile(id);
    return this.prisma.userProfile.delete({ where: { id } });
  }

  async createEducation(input: CreateEducationInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.education.create({ data: input });
  }

  async findEducations(userProfileId: string) {
    return this.prisma.education.findMany({ where: { userProfileId } });
  }

  async findEducation(id: string) {
    const education = await this.prisma.education.findUnique({ where: { id } });
    if (!education) throw new NotFoundException('Education record not found');
    return education;
  }

  async updateEducation(id: string, data: UpdateEducationInput) {
    await this.findEducation(id);
    return this.prisma.education.update({ where: { id }, data });
  }

  async removeEducation(id: string) {
    await this.findEducation(id);
    return this.prisma.education.delete({ where: { id } });
  }

  async createExperience(input: CreateExperienceInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.experience.create({ data: input });
  }

  findExperiences(userProfileId: string) {
    return this.prisma.experience.findMany({ where: { userProfileId } });
  }

  async findExperience(id: string): Promise<Experience> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    return experience;
  }

  async updateExperience(id: string, data: UpdateExperienceInput) {
    await this.findExperience(id);
    return this.prisma.experience.update({ where: { id }, data });
  }

  async removeExperience(id: string) {
    await this.findExperience(id);
    return this.prisma.experience.delete({ where: { id } });
  }

  async createSkill(input: CreateSkillInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.skill.create({ data: input });
  }

  findSkills(userProfileId: string) {
    return this.prisma.skill.findMany({ where: { userProfileId } });
  }

  async findSkill(id: string): Promise<Skill> {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }

  async updateSkill(id: string, data: UpdateSkillInput) {
    await this.findSkill(id);
    return this.prisma.skill.update({ where: { id }, data });
  }

  async removeSkill(id: string) {
    await this.findSkill(id);
    return this.prisma.skill.delete({ where: { id } });
  }

  async createCertification(input: CreateCertificationInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.certification.create({ data: input });
  }

  findCertifications(userProfileId: string) {
    return this.prisma.certification.findMany({ where: { userProfileId } });
  }

  async findCertification(id: string): Promise<Certification> {
    const certificate = await this.prisma.certification.findUnique({
      where: { id },
    });
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    return certificate;
  }

  async updateCertification(id: string, data: UpdateCertificationInput) {
    await this.findCertification(id);
    return this.prisma.certification.update({ where: { id }, data });
  }

  async removeCertification(id: string) {
    await this.findCertification(id);
    return this.prisma.certification.delete({ where: { id } });
  }

  async createProject(input: CreateProjectInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.project.create({ data: input });
  }

  findProjects(userProfileId: string) {
    return this.prisma.project.findMany({ where: { userProfileId } });
  }

  async findProject(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async updateProject(id: string, data: UpdateProjectInput) {
    await this.findProject(id);
    return this.prisma.project.update({ where: { id }, data });
  }

  async removeProject(id: string) {
    await this.findProject(id);
    return this.prisma.project.delete({ where: { id } });
  }

  async createLanguage(input: CreateLanguageInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.language.create({ data: input });
  }

  findLanguages(userProfileId: string) {
    return this.prisma.language.findMany({ where: { userProfileId } });
  }

  async findLanguage(id: string): Promise<Language> {
    const language = await this.prisma.language.findUnique({ where: { id } });
    if (!language) {
      throw new NotFoundException('Language not found');
    }
    return language;
  }

  async updateLanguage(id: string, data: UpdateLanguageInput) {
    await this.findLanguage(id);
    return this.prisma.language.update({ where: { id }, data });
  }

  async removeLanguage(id: string) {
    await this.findLanguage(id);
    return this.prisma.language.delete({ where: { id } });
  }

  async createSocialLink(input: CreateSocialLinkInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.socialLink.create({ data: input });
  }

  findSocialLinks(userProfileId: string) {
    return this.prisma.socialLink.findMany({ where: { userProfileId } });
  }

  async findSocialLink(id: string): Promise<SocialLink> {
    const link = await this.prisma.socialLink.findUnique({ where: { id } });
    if (!link) {
      throw new NotFoundException('Social link not found');
    }
    return link;
  }

  async updateSocialLink(id: string, data: UpdateSocialLinkInput) {
    await this.findSocialLink(id);
    return this.prisma.socialLink.update({ where: { id }, data });
  }

  async removeSocialLink(id: string) {
    await this.findSocialLink(id);
    return this.prisma.socialLink.delete({ where: { id } });
  }

  async createHobby(input: CreateHobbyInput) {
    const userId = input.userProfileId;
    if (!userId) throw new BadRequestException('userId is required');
    await this.findUserProfileByUserId(input.userProfileId);
    return this.prisma.hobby.create({ data: input });
  }

  findHobbies(userProfileId: string) {
    return this.prisma.hobby.findMany({ where: { userProfileId } });
  }

  async findHobby(id: string): Promise<Hobby> {
    const hobby = await this.prisma.hobby.findUnique({ where: { id } });
    if (!hobby) {
      throw new NotFoundException('Hobby not found');
    }
    return hobby;
  }

  async updateHobby(id: string, data: UpdateHobbyInput) {
    await this.findHobby(id);
    return this.prisma.hobby.update({ where: { id }, data });
  }

  async removeHobby(id: string) {
    await this.findHobby(id);
    return this.prisma.hobby.delete({ where: { id } });
  }
}
