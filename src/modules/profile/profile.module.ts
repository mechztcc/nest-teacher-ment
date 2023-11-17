import { Module } from '@nestjs/common';
import { CreateProfileService } from './services/create-profile/create-profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileController } from './controllers/profile.controller';
import { FindProfileService } from './services/find-profile/find-profile.service';

@Module({
  providers: [CreateProfileService, FindProfileService],
  imports: [PrismaModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
