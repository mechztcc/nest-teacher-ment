import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create/create.service';
import { PrismaModule } from '../prisma/prisma.module';
import { InformationsService } from './services/informations/informations/informations.service';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService, InformationsService],
  imports: [PrismaModule],
})
export class UsersModule {}
