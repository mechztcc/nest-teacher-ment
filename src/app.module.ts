import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeamsModule } from './modules/teams/teams.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
