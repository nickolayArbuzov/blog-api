import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JWT } from '../../../../helpers/helpers/jwt';
import { DevicesRepo } from '../../../devices/infrastructure/devices.repo';

export class LogoutCommand {
  constructor(
    public refreshToken: string,
  ) {}
}

@CommandHandler(LogoutCommand)
export class LogoutUseCase {
  constructor(
    private devicesRepo: DevicesRepo,
    private readonly jwtService: JWT,
  ) {}

  async execute(command: LogoutCommand){
    const refresh = this.jwtService.verify(command.refreshToken);
    const res = await this.devicesRepo.logout(refresh.userId, refresh.deviceId, refresh.issuedAt)
    if(res.deletedCount === 0) {
      throw new HttpException('Device not found', HttpStatus.UNAUTHORIZED)
    } else {
      return
    }
  }
}