import { CommandHandler } from '@nestjs/cqrs';
import {v4} from 'uuid';
import { DevicesRepo } from '../../../devices/infrastructure/devices.repo';
import { Device } from '../../../devices/domain/entitites/device';
import { ConfigService } from '@nestjs/config';
import { JWT } from '../../../../helpers/helpers/jwt';

export class LoginCommand {
  constructor(
    public user: {login: string, id: string},
    public ip: string,
    public deviceName: string,
  ) {}
}

@CommandHandler(LoginCommand)
export class LoginUseCase {
  constructor(
    private devicesRepo: DevicesRepo,
    private jwtService: JWT,
    private configService: ConfigService,
  ) {}

  async execute(command: LoginCommand){
    const deviceId = v4()
    const device: Device = {
      ip: command.ip,
      title: command.deviceName, 
      deviceId: deviceId,
      issuedAt: new Date().getTime(),
      expiresAt: new Date().getTime() + Number(this.configService.get('JWT_PERIOD')) * 1000,
      userId: command.user.id,
    }
    const payloadAccess = {userId: command.user.id, userLogin: command.user.login, deviceId: device.deviceId, issuedAt: device.issuedAt}
    const payloadRefresh = {userId: command.user.id, userLogin: command.user.login, deviceId: device.deviceId, issuedAt: device.issuedAt}
    const accessToken = this.jwtService.sign(payloadAccess, {expiresIn: `${Number(this.configService.get('JWT_PERIOD')) / 2}s`})
    const refreshToken = this.jwtService.sign(payloadRefresh, {expiresIn: `${Number(this.configService.get('JWT_PERIOD'))}s`})
    await this.devicesRepo.createDevice(device)
    return {
      accessToken,
      refreshToken
    }
  } 
}