import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { CreateSessionService } from './services/create-session/create-session.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [CreateSessionService],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
