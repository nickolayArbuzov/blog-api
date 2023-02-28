import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../sa/sa-users/domain/entitites/user.entity';
import { CommentEntity } from '../../../comments/domain/entitites/comments.entity';
import { PostEntity } from '../../../posts/domain/entitites/posts.entity';

@Entity('likes')
export class LikeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column({type: 'uuid', nullable: true})
  postId: string;

  @Column({type: 'uuid', nullable: true})
  commentId: string;

  @Column('timestamp with time zone')
  addedAt: string;

  @Column('text')
  status: string;

  @ManyToOne(() => PostEntity, post => post.likes)
  post: PostEntity

  @ManyToOne(() => CommentEntity, comment => comment.likes)
  comment: CommentEntity

}
