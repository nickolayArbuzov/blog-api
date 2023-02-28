import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloggerUserEntity } from '../../features/blogger/blogger-user/domain/entitites/blogger-user.entity';
import { BlogEntity } from '../../features/blogs/entitites/blogs.entity';
import { CommentEntity } from '../../features/comments/domain/entitites/comments.entity';
import { DeviceEntity } from '../../features/devices/domain/entitites/devices.entity';
import { LikeEntity } from '../../features/likes/domain/entitites/likes.entity';
import { PostEntity } from '../../features/posts/domain/entitites/posts.entity';
import { UserEntity } from '../../features/sa/sa-users/domain/entitites/user.entity';

@Injectable()
export class AllDataService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    @InjectRepository(DeviceEntity)
    private deviceEntity: Repository<DeviceEntity>,
    
  ) {}

  async deleteAllData(): Promise<void> {
    await this.userEntity.delete({})
    await this.deviceEntity.delete({})
  }
  
}