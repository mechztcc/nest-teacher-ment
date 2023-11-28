import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create/create.service';
import { PrismaModule } from '../prisma/prisma.module';
import { InformationsService } from './services/informations/informations/informations.service';
import { FindByEmailService } from './services/find-by-email/find-by-email.service';
import { FindByIdService } from './services/find-by-id/find-by-id.service';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService, InformationsService, FindByEmailService, FindByIdService],
  imports: [PrismaModule],
})
export class UsersModule {}
