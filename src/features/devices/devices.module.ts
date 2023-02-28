import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '../../helpers/helpers/jwt';
import { DevicesController } from './api/devices.controller';
import { DevicesRepo } from './infrastructure/devices.repo';
import { FindAllDevicesByCurrentUserIdUseCase } from './application/use-cases/FindAllDevicesByCurrentUserId';
import { DeleteOneDeviceByIdUseCase } from './application/use-cases/DeleteOneDeviceById';
import { DeleteAllDeviceByCurrentUserIdExceptCurrentDeviceUseCase } from './application/use-cases/DeleteAllDeviceByCurrentUserIdExceptCurrentDevice';
import { CqrsModule } from '@nestjs/cqrs';
import { DevicesSQL } from './infrastructure/devices.repositorySQL';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from './domain/entitites/devices.entity';

const commands = [DeleteOneDeviceByIdUseCase, DeleteAllDeviceByCurrentUserIdExceptCurrentDeviceUseCase]
const queries = [FindAllDevicesByCurrentUserIdUseCase]

@Module({
  controllers: [DevicesController],
  imports: [TypeOrmModule.forFeature([DeviceEntity]), JwtModule, CqrsModule],
  providers: [
    DevicesRepo,
    DevicesSQL,
    JWT,
    ...commands,
    ...queries,
  ],
  exports: [
    DevicesRepo, TypeOrmModule
  ]
})
export class DevicesModule {}
