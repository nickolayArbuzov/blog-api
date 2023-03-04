import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BanUserBlogDto } from '../../../../shared/dto/ban.dto';
import { BanUserByIdCommand } from '../application/use-cases/BanUserById';
import { FindAllBannedUsersByBlogIdQuery } from '../application/use-cases/FindAllBannedUsersByBlogId';
import { QueryUserDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('blogger/users')
export class BloggerUserController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Put(':id/ban')
    async banUserById(@Param('id') userId: string, @Body() banUserBlogDto: BanUserBlogDto, @Req() req){
        return await this.commandBus.execute(new BanUserByIdCommand(userId, banUserBlogDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Get('blog/:id')
    async findAllBannedUsersByBlogId(@Query() query: QueryUserDto, @Param('id') blogId: string, @Req() req){
        return await this.queryBus.execute(new FindAllBannedUsersByBlogIdQuery(query, blogId, req.user.userId))
    }

}