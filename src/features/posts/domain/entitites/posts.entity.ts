import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../sa/sa-users/domain/entitites/user.entity';
import { BlogEntity } from '../../../blogs/entitites/blogs.entity';
import { LikeEntity } from '../../../likes/domain/entitites/likes.entity';
import { CommentEntity } from '../../../comments/domain/entitites/comments.entity';

@Entity('posts')
export class PostEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', collation: 'C' })
  title: string;

  @Column({ type: 'text', collation: 'C' })
  shortDescription: string;

  @Column({ type: 'text', collation: 'C' })
  content: string;

  @Column('uuid')
  blogId: string;

  @Column('timestamp with time zone')
  createdAt: string;

  @ManyToOne(() => UserEntity, user => user.posts)
  user: UserEntity

  @ManyToOne(() => BlogEntity, blog => blog.posts)
  blog: BlogEntity

  @OneToMany(() => CommentEntity, comment => comment.post)
  comments: CommentEntity[]

  @OneToMany(() => LikeEntity, like => like.post)
  likes: LikeEntity[]

}
