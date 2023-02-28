import { QueryHandler } from '@nestjs/cqrs';
import { queryDefault } from '../../../../../helpers/constants/constants/constants';
import { QueryBlogDto } from '../../../../../helpers/constants/commonDTO/query.dto';
import { CommentsRepo } from '../../../../comments/infrastructure/comments.repo';
import { LikesRepo } from '../../../../likes/infrastructure/like.repo';

export class FindAllCommentsForUsersBlogsQuery {
  constructor(
    public queryParams: QueryBlogDto,
    public userId: string,
  ) {}
}

@QueryHandler(FindAllCommentsForUsersBlogsQuery)
export class FindAllCommentsForUsersBlogsUseCase {
  constructor(
    private likesRepo: LikesRepo,
    private commentsRepo: CommentsRepo,
  ) {}

  async execute(query: FindAllCommentsForUsersBlogsQuery){
    const queryParams = {
      pageNumber: query.queryParams.pageNumber || queryDefault.pageNumber,
      pageSize: query.queryParams.pageSize || queryDefault.pageSize,
      sortBy: query.queryParams.sortBy || queryDefault.sortBy,
      sortDirection: query.queryParams.sortDirection === 'asc' ? query.queryParams.sortDirection : queryDefault.sortDirection,
    }

    // TODO запрос с лайками
    const comments = await this.commentsRepo.findCommentsByBloggerId(queryParams, query.userId)

    return comments
  }
}