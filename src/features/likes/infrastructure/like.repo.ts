import { Injectable } from '@nestjs/common';
import { Like } from '../domain/entitites/like';
import { LikesSQL } from './like.repositorySQL';

@Injectable()
export class LikesRepo {
  constructor(private likesRepo: LikesSQL) {}

  async like(user: {userId: string, userLogin: string}, likeStatus: string, postId: string | null, commentId: string | null) {
    const likePosition = await this.likesRepo.findOne(user.userId, postId ? postId : null, commentId ? commentId : null)
    if(likePosition) {
        if(likeStatus === 'None') {
            await this.likesRepo.deleteOne(user.userId, postId ? postId : null, commentId ? commentId : null)
        }
        if(likeStatus !== likePosition.status) {
            await this.likesRepo.updateOne(user.userId, postId ? postId : null, commentId ? commentId : null, likeStatus)
        }
    } 
    if(!likePosition && likeStatus !== 'None') {
        await this.likesRepo.insertOne({
            userId: user.userId,
            banned: false,
            login: user.userLogin,
            postId: postId,
            commentId: commentId,
            addedAt: new Date().toISOString(),
            status: likeStatus,
        })
    }
    return true
  }
}