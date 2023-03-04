import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../sa/sa-users/domain/entitites/user.entity';
import { PostEntity } from '../../../posts/domain/entitites/posts.entity';
import { BlogEntity } from '../../../blogs/entitites/blogs.entity';
import { LikeEntity } from '../../../likes/domain/entitites/likes.entity';

@Entity('comments')
export class CommentEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', collation: 'C' })
  content: string;

  @Column('timestamp with time zone')
  createdAt: string;

  @Column('uuid')
  commentatorUserId: string;

  @Column('uuid')
  postId: string;

  @Column('uuid')
  blogId: string;

  @ManyToOne(() => UserEntity, user => user.comments)
  user: UserEntity

  @ManyToOne(() => BlogEntity, blog => blog.comments)
  blog: BlogEntity

  @ManyToOne(() => PostEntity, post => post.comments)
  post: PostEntity

  @OneToMany(() => LikeEntity, like => like.comment)
  likes: LikeEntity[]

}
