import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepo } from '../../sa/sa-users/infrastructure/users.repo';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepo: UsersRepo,
  ) {
    super({
      usernameField: 'loginOrEmail'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const auth = await this.usersRepo.findByLoginOrEmail(username)
    console.log('auth', auth)
    if (!auth || auth.banInfo.isBanned === true){
      throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
    }
    const candidateHash = await bcrypt.hash(password, auth.passwordSalt.toString())
    if (auth.passwordHash.toString() === candidateHash) {
      return { id: auth.id, login: auth.login }
    } else {
        throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
    }
  }
}