import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesModule } from '../likes/likes.module';
import { PostsModule } from '../posts/posts.module';
import { BlogsController } from './api/blogs.controller';
import { BlogsService } from './application/blogs.service';
import { FindAllBlogsUseCase } from './application/use-cases/FindAllBlogs';
import { FindOneBlogByIdUseCase } from './application/use-cases/FindOneBlogById';
import { FindPostsByBlogIdUseCase } from './application/use-cases/FindPostsByBlogId';
import { BlogIsExistRule } from './custom-validators/customValidateBlog';
import { BlogEntity } from './entitites/blogs.entity';
import { BlogsRepo } from './infrastructure/blogs.repo';
import { BlogsSQL } from './infrastructure/blogs.repositorySQL';

const commands = []
const queries = [FindAllBlogsUseCase, FindPostsByBlogIdUseCase, FindOneBlogByIdUseCase]

@Module({
  controllers: [BlogsController],
  imports: [PostsModule, LikesModule, CqrsModule],
  providers: [
    BlogsService,
    BlogsRepo,
    BlogsSQL,
    BlogIsExistRule,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [
    BlogsRepo
  ]

})
export class BlogsModule {}
