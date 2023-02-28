import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { LikesModule } from '../../likes/likes.module';
import { PostsModule } from '../../posts/posts.module';
import { BloggerUserController } from './api/blogger-user.controller';
import { BanUserByIdUseCase } from './application/use-cases/BanUserById';
import { FindAllBannedUsersByBlogIdUseCase } from './application/use-cases/FindAllBannedUsersByBlogId';
import { BlogIsExistRule } from './custom-validators/customValidateBlog';
import { BloggerUserRepo } from './infrastructure/blogger-user.repo';
import { SAUsersModule } from '../../sa/sa-users/sa-users.module';
import { BloggerBlogModule } from '../blogger-blog/blogger-blog.module';
import { BloggerUserSQL } from './infrastructure/blogger-user.repositorySQL';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloggerUserEntity } from './domain/entitites/blogger-user.entity';

const commands = [BanUserByIdUseCase]
const queries = [FindAllBannedUsersByBlogIdUseCase]

@Module({
  controllers: [BloggerUserController],
  imports: [forwardRef(() => PostsModule), LikesModule, CqrsModule, SAUsersModule, BloggerBlogModule],
  providers: [
    BloggerUserRepo,
    BloggerUserSQL,
    BlogIsExistRule,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [
    BloggerUserRepo
  ]

})
export class BloggerUserModule {}
