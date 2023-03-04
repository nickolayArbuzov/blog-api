import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDefaultDto, UpdatePostDefaultDto } from '../../../posts/dto/post.dto';
import { QueryBlogDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blogger.dto';
import { DeleteOneBlogByIdCommand } from '../application/use-cases/DeleteOneBlogById';
import { UpdateOneBlogByIdCommand } from '../application/use-cases/UpdateOneBlogById';
import { CreateOnePostForBlogIdCommand } from '../application/use-cases/CreateOnePostForBlogId';
import { UpdateOnePostOverBlogCommand } from '../application/use-cases/UpdateOnePostOverBlog';
import { DeleteOnePostOverBlogCommand } from '../application/use-cases/DeleteOnePostOverBlog';
import { FindAllBlogsQuery } from '../application/use-cases/FindAllBlogs';
import { CreateOneBlogCommand } from '../application/use-cases/CreateOneBlog';
import { FindAllCommentsForUsersBlogsQuery } from '../application/use-cases/FindAllCommentsForUsersBlogs';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('blogger/blogs')
export class BloggerController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('comments')
    async findAllCommentsForUsersBlogs(@Query() query: QueryBlogDto, @Req() req){
        return await this.queryBus.execute(new FindAllCommentsForUsersBlogsQuery(query, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id')
    async deleteOneBlogById(@Param('id') id: string, @Req() req){
        return await this.commandBus.execute(new DeleteOneBlogByIdCommand(id, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Put(':id')
    async updateOneBlogById(@Param('id') id: string, @Body() blogDto: UpdateBlogDto, @Req() req){
        return await this.commandBus.execute(new UpdateOneBlogByIdCommand(id, blogDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/posts')
    async createOnePostForBlogId(@Param('id') id: string, @Body() postDto: CreatePostDefaultDto, @Req() req){
        return await this.commandBus.execute(new CreateOnePostForBlogIdCommand(id, postDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Put(':blogId/posts/:postId')
    async updateOnePostOverBlog(@Param('blogId') blogId: string, @Param('postId') postId: string, @Body() postDto: UpdatePostDefaultDto, @Req() req){
        return await this.commandBus.execute(new UpdateOnePostOverBlogCommand(blogId, postId, postDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':blogId/posts/:postId')
    async deleteOnePostOverBlog(@Param('blogId') blogId: string, @Param('postId') postId: string, @Req() req){
        return await this.commandBus.execute(new DeleteOnePostOverBlogCommand(blogId, postId, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOneBlog(@Body() blogDto: CreateBlogDto, @Req() req){
        return await this.commandBus.execute(new CreateOneBlogCommand(blogDto, req.user))
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllBlogs(@Query() query: QueryBlogDto, @Req() req){
        return await this.queryBus.execute(new FindAllBlogsQuery(query, req.user.userId))
    }

}