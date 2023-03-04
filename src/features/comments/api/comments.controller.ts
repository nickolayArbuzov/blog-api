import {Body, Controller, Delete, Get, HttpCode, Param, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLikeDto } from '../../likes/dto/like.dto';
import { ExtractUserFromToken } from '../../../helpers/guards/extractUserFromToken.guard';
import { UpdateCommentDto } from '../dto/comment.dto';
import { FindOneCommentByIdQuery } from '../application/use-cases/FindOneCommentById';
import { DeleteOneCommentByIdCommand } from '../application/use-cases/DeleteOneCommentById';
import { UpdateOneCommentByIdCommand } from '../application/use-cases/UpdateOneCommentById';
import { LikeCommand } from '../application/use-cases/Like';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
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

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Put(':id')
    async updateOneCommentById(@Param('id') id: string, @Body() commentDto: UpdateCommentDto, @Req() req){
        return await this.commandBus.execute(new UpdateOneCommentByIdCommand(id, commentDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id')
    async deleteOneCommentById(@Param('id') id: string, @Req() req){
        return await this.commandBus.execute(new DeleteOneCommentByIdCommand(id, req.user?.userId))
    }
    
    @UseGuards(ExtractUserFromToken)
    @Get(':id')
    async findOneCommentById(@Param('id') id: string, @Req() req){
        return await this.queryBus.execute(new FindOneCommentByIdQuery(id, req.user?.userId))
    }
}