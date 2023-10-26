import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDto } from '../dto/create-session.dto';
import { CreateSessionService } from '../services/create-session/create-session.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly createSession: CreateSessionService) {}

  @Post()
  async create(@Body() payload: CreateSessionDto): Promise<any> {
    return this.createSession.execute(payload);
  }
}
