import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Attempts } from '../state/attempts';

@Injectable()
export class AttemptsGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if(!+this.configService.get('IP_RESTRICTION')){
      console.log('IP_RESTRICTION - off')
      return true
    }
    console.log('IP_RESTRICTION - on')
    const request: Request = context.switchToHttp().getRequest();

    const ipPath = `${request.ip}${request.path}`
    Attempts.addAttempts(ipPath)
    Attempts.clearAttempts()
    
    if (Attempts.checkAttempts(ipPath)){
        return true;
    }

    throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
  }
}