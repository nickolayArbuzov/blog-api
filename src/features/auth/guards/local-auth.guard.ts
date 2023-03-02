import {
    BadRequestException,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { AuthDto } from '../dto/auth.dto';
  import { validate, validateOrReject } from 'class-validator';
  
  @Injectable()
  export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
      super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      try {
        const authDto = new AuthDto();
        authDto.loginOrEmail = req.body?.loginOrEmail;
        authDto.password = req.body?.password;
        const result = await validateOrReject(authDto);
      } catch (e) {
        const errorsResponse = [];
        e.forEach((e) => errorsResponse.push(e.constraints));
        throw new BadRequestException(errorsResponse);
      }
      const isValidBody = await validate(req.body, AuthDto);
      if (!isValidBody) throw new BadRequestException('invalid login data');
      const result: boolean = await (super.canActivate(
        context,
      ) as Promise<boolean>);
      if (!result) return false;
      return result;
    }
  }