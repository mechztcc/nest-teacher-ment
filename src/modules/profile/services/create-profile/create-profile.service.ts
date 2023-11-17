import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateProfileDto } from '../../dto/create-profile.dto';

interface IRequest {
  userId: number;
  data: CreateProfileDto;
}
@Injectable()
export class CreateProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: IRequest): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    const profileExists = await this.prisma.profile.findUnique({
      where: { userId: payload.userId },
    });

    if (profileExists) {
      return await this.prisma.profile.update({
        data: {
          city: payload.data.city,
          organization: payload.data.organization,
          phone: payload.data.phone,
          state: payload.data.state,
        },
        where: { userId: payload.userId },
      });
    }

    if (!profileExists) {
      return await this.prisma.profile.create({
        data: {
          city: payload.data.city,
          organization: payload.data.organization,
          phone: payload.data.phone,
          state: payload.data.state,
          userId: payload.userId,
        },
      });
    }
  }
}
