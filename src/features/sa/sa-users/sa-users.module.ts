import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './api/users.controller';
import { BanOneUserByIdUseCase } from './application/use-cases/BanOneUserById';
import { CreateOneUserUseCase } from './application/use-cases/CreateOneUser';
import { DeleteOneUserByIdUseCase } from './application/use-cases/DeleteOneUserById';
import { FindAllUsersUseCase } from './application/use-cases/FindAllUsers';
import { UserCodeIsConfirmedRule, UserLoginIsExistRule, UserMailCheckRule, UserMailIsExistRule } from './custom-validators/customValidateUser';
import { UsersRepo } from './infrastructure/users.repo';
import { LikesModule } from '../../likes/likes.module';
import { UsersSQL } from './infrastructure/users.repositorySQL';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entitites/user.entity';
import { CredInfoUserEntity } from './domain/entitites/credInfoUser.entity';
import { BanInfoUserEntity } from './domain/entitites/banInfoUser.entity';
import { UsersService } from './application/users.service';

const commands = [CreateOneUserUseCase, DeleteOneUserByIdUseCase, BanOneUserByIdUseCase]
const queries = [FindAllUsersUseCase]

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity, CredInfoUserEntity, BanInfoUserEntity]), CqrsModule, LikesModule],
  providers: [
    UsersService,
    UsersRepo,
    UsersSQL,
    UserMailIsExistRule,
    UserLoginIsExistRule,
    UserCodeIsConfirmedRule,
    UserMailCheckRule,
    ...commands,
    ...queries,
  ],
  exports: [
    UsersRepo, TypeOrmModule,
  ]
})
export class SAUsersModule {}
