import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { QueryBlogDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { queryDefault } from '../../../../helpers/constants/constants/constants';
import { CommentsRepo } from '../../../comments/infrastructure/comments.repo';
import { LikesRepo } from '../../../likes/infrastructure/like.repo';
import { PostsRepo } from '../../infrastructure/posts.repo';

export class FindCommentsByPostIdQuery {
  constructor(
    public postId: string, 
    public queryParams: QueryBlogDto,
    public userId: string,
  ) {}
}

@QueryHandler(FindCommentsByPostIdQuery)
export class FindCommentsByPostIdCase {
  constructor(
    private postsRepo: PostsRepo,
    private commentsRepo: CommentsRepo,
  ) {}

    async execute(query: FindCommentsByPostIdQuery){
      const post = await this.postsRepo.findOnePostById(query.postId)
      if(!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      const queryParams = {
        pageNumber: query.queryParams.pageNumber || queryDefault.pageNumber,
        pageSize: query.queryParams.pageSize || queryDefault.pageSize,
        sortBy: query.queryParams.sortBy || queryDefault.sortBy,
        sortDirection: query.queryParams.sortDirection === 'asc' ? query.queryParams.sortDirection : queryDefault.sortDirection,
      }
      // TODO комменты с лайками
      const comments = await this.commentsRepo.findCommentsByPostId(query.postId, queryParams)
      return comments
    }
}