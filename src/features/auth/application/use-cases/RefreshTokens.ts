import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JWT } from '../../../../helpers/helpers/jwt';
import { DevicesRepo } from '../../../devices/infrastructure/devices.repo';

export class RefreshTokensCommand {
  constructor(
    public refreshToken: string,
  ) {}
}

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensUseCase {
  constructor(
    private devicesRepo: DevicesRepo,
    private readonly jwtService: JWT,
    private configService: ConfigService,
  ) {}

    async execute(command: RefreshTokensCommand){
      try{
        const refresh = this.jwtService.verify(command.refreshToken);
        const device = await this.devicesRepo.findOneDeviceByRefreshTokenData(refresh.deviceId, refresh.issuedAt)
        if(device) {
          const issuedAt = new Date().getTime()
          const expiresAt = new Date().getTime() + Number(this.configService.get('JWT_PERIOD')) * 1000
          const payloadAccess = {userId: device.userId, deviceId: device.deviceId, issuedAt: issuedAt}
          const payloadRefresh = {userId: device.userId, deviceId: device.deviceId, issuedAt: issuedAt}
          const accessToken = this.jwtService.sign(payloadAccess, {expiresIn: `${Number(this.configService.get('JWT_PERIOD')) / 2}s`})
          const refreshToken = this.jwtService.sign(payloadRefresh, {expiresIn: `${Number(this.configService.get('JWT_PERIOD'))}s`})
          await this.devicesRepo.updateDevice(device.deviceId.toString(), issuedAt, expiresAt)
          return {
            accessToken,
            refreshToken
          }
        } else {
          throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED)
        }
      }
      catch(e){
        throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED)
      }
    }
}