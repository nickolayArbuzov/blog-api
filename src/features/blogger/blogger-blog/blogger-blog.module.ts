import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { LikesModule } from '../../likes/likes.module';
import { PostsModule } from '../../posts/posts.module';
import { BloggerController } from './api/blogger.controller';
import { CreateOneBlogUseCase } from './application/use-cases/CreateOneBlog';
import { CreateOnePostForBlogIdUseCase } from './application/use-cases/CreateOnePostForBlogId';
import { DeleteOneBlogByIdUseCase } from './application/use-cases/DeleteOneBlogById';
import { DeleteOnePostOverBlogUseCase } from './application/use-cases/DeleteOnePostOverBlog';
import { FindAllBlogsUseCase } from './application/use-cases/FindAllBlogs';
import { UpdateOneBlogByIdUseCase } from './application/use-cases/UpdateOneBlogById';
import { UpdateOnePostOverBlogUseCase } from './application/use-cases/UpdateOnePostOverBlog';
import { BlogIsExistRule } from './custom-validators/customValidateBlog';
import { BloggerRepo } from './infrastructure/blogger.repo';
import { FindAllCommentsForUsersBlogsUseCase } from './application/use-cases/FindAllCommentsForUsersBlogs';
import { CommentsModule } from '../../comments/comments.module';
import { BloggerSQL } from './infrastructure/blogger.repositorySQL';
import { BloggerService } from './application/blogger.service';

const commands = [
  DeleteOneBlogByIdUseCase, CreateOneBlogUseCase, CreateOnePostForBlogIdUseCase, 
  DeleteOnePostOverBlogUseCase, UpdateOneBlogByIdUseCase, UpdateOnePostOverBlogUseCase,
]
const queries = [FindAllBlogsUseCase, FindAllCommentsForUsersBlogsUseCase]

@Module({
  controllers: [BloggerController],
  imports: [forwardRef(() => PostsModule), LikesModule, CqrsModule, CommentsModule],
  providers: [
    BloggerService,
    BloggerRepo,
    BloggerSQL,
    BlogIsExistRule,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [
    BloggerRepo,
  ]

})
export class BloggerBlogModule {}
