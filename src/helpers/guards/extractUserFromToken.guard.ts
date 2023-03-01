import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWT } from '../helpers/jwt';

@Injectable()
export class ExtractUserFromToken implements CanActivate {
  constructor(
    private jwtService: JWT
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if(!request.headers.authorization){
      return true;
    }

    try {
      const user = this.jwtService.verify(request.headers.authorization.split(' ')[1])
      if (user){
        request.user = {userId: user.userId, userLogin: user.userLogin}
        return true
      }
    } catch {
      return true
    }

  }
}