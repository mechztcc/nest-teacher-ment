import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateSessionDto } from '../dto/create-session.dto';
import { CreateSessionService } from '../services/create-session/create-session.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly createSession: CreateSessionService) {}

  @Post()
  async create(
    @Body() payload: CreateSessionDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const data = await this.createSession.execute(payload);

    response.cookie('token', data.user.token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return data;
  }
}
