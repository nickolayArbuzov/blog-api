import { Module } from '@nestjs/common';
import { CommentsController } from './api/comments.controller';
import { CommentsRepo } from './infrastructure/comments.repo';
import { LikesModule } from '../likes/likes.module';
import { JwtService } from '@nestjs/jwt';
import { LikeUseCase } from './application/use-cases/Like';
import { UpdateOneCommentByIdUseCase } from './application/use-cases/UpdateOneCommentById';
import { DeleteOneCommentByIdUseCase } from './application/use-cases/DeleteOneCommentById';
import { FindOneCommentByIdUseCase } from './application/use-cases/FindOneCommentById';
import { CqrsModule } from '@nestjs/cqrs';
import { SAUsersModule } from '../sa/sa-users/sa-users.module';
import { CommentsSQL } from './infrastructure/comments.repositorySQL';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './domain/entitites/comments.entity';

const commands = [LikeUseCase, UpdateOneCommentByIdUseCase, DeleteOneCommentByIdUseCase]
const queries = [FindOneCommentByIdUseCase]

@Module({
  controllers: [CommentsController],
  imports: [LikesModule, CqrsModule, SAUsersModule],
  providers: [
    CommentsRepo,
    CommentsSQL,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [
    CommentsRepo
  ]
})
export class CommentsModule {}
