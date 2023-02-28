import { Injectable } from '@nestjs/common';
import { UsersRepo } from '../infrastructure/users.repo';

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepo
  ) {}

    async findOneForCustomDecoratorByLogin(login: string, field: string) {
      return this.usersRepo.findOneForCustomDecoratorByLogin(login, field)
    }
  
    async findOneForCustomDecoratorByEmail(email: string, field: string) {
      return this.usersRepo.findOneForCustomDecoratorByEmail(email, field)
    }
  
    async findOneForCustomDecoratorByCode(code: string, field: string) {
      return this.usersRepo.findOneForCustomDecoratorByCode(code, field)
    }
  
    async findOneForCustomDecoratorCheckMail(email: string, field: string) {
      return this.usersRepo.findOneForCustomDecoratorCheckMail(email, field)
    }
}