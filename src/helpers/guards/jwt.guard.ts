import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT } from '../helpers/jwt';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    private jwtService: JWT,
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (request.headers?.authorization) {
      try {
        const user = this.jwtService.verify(request.headers?.authorization?.split(' ')[1])
        if (user){
          request.user = {userId: user.userId, userLogin: user.userLogin}
          return true;
        }
      } catch {
        throw new UnauthorizedException()
      }
    }

    throw new UnauthorizedException()
  }
}