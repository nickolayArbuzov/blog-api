import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../sa/sa-users/domain/entitites/user.entity';
import { CommentEntity } from '../../comments/domain/entitites/comments.entity';
import { PostEntity } from '../../posts/domain/entitites/posts.entity';

@Entity('blogs')
export class BlogEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', collation: 'C' })
  name: string;

  @Column({ type: 'text', collation: 'C' })
  description: string;

  @Column('text')
  websiteUrl: string;

  @Column('timestamp with time zone')
  createdAt: string;

  @Column('boolean')
  isMembership: boolean;

  @Column('boolean')
  isBanned: boolean;

  @Column('timestamp with time zone')
  banDate: string;

  @Column('uuid')
  ownerUserId: string;

  @OneToMany(() => PostEntity, post => post.blog)
  posts: PostEntity[]

  @OneToMany(() => CommentEntity, comment => comment.blog)
  comments: CommentEntity[]

}
