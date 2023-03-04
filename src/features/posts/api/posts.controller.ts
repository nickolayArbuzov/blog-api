import {Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards, Req} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { QueryBlogDto } from '../../../helpers/constants/commonDTO/query.dto';
import { CreateCommentDto } from '../../comments/dto/comment.dto';
import { CreateLikeDto } from '../../likes/dto/like.dto';
import { ExtractUserFromToken } from '../../../helpers/guards/extractUserFromToken.guard';
import { LikeCommand } from '../application/use-cases/Like';
import { FindCommentsByPostIdQuery } from '../application/use-cases/FindCommentsByPostId';
import { CreateOneCommentByPostIdCommand } from '../application/use-cases/CreateOneCommentByPostId';
import { FindAllPostsQuery } from '../application/use-cases/FindAllPosts';
import { FindOnePostByIdQuery } from '../application/use-cases/FindOnePostById';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Put(':id/like-status')
    async like(@Param('id') id: string, @Body() likeDto: CreateLikeDto, @Req() req){
        return await this.commandBus.execute(new LikeCommand(id, likeDto.likeStatus, req.user))
    }

    @UseGuards(ExtractUserFromToken)
    @Get(':id/comments')
    async findCommentsByPostId(@Param('id') id: string, @Query() query: QueryBlogDto, @Req() req){
        return await this.queryBus.execute(new FindCommentsByPostIdQuery(id, query, req.user?.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/comments')
    async createOneCommentByPostId(@Param('id') postId: string, @Body() commentDto: CreateCommentDto, @Req() req){
        return await this.commandBus.execute(new CreateOneCommentByPostIdCommand(postId, commentDto, req.user))
    }

    @UseGuards(ExtractUserFromToken)
    @Get()
    async findAllPosts(@Query() query: QueryBlogDto, @Req() req){
        return await this.queryBus.execute(new FindAllPostsQuery(query, req.user?.userId))
    }

    @UseGuards(ExtractUserFromToken)
    @Get(':id')
    async findOnePostById(@Param('id') id: string, @Req() req){
        return await this.queryBus.execute(new FindOnePostByIdQuery(id, req.user?.userId))
    }

}