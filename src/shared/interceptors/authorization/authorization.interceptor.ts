import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.cookie) {
      const cookies = request.headers.cookie.split(';').filter((cookie) => {
        return cookie.includes('token');
      });

      const [_, token] = cookies[0].split('=');

      const decoded = this.jwtService.decode(token);

      if (!token || !decoded) {
        throw new UnauthorizedException('Token has not provided');
      }

      request.headers['user'] = decoded;

      return next.handle();
    }
  }
}
