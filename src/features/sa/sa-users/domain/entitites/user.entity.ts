import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from '../../../../blogs/entitites/blogs.entity';
import { CommentEntity } from '../../../../comments/domain/entitites/comments.entity';
import { PostEntity } from '../../../../posts/domain/entitites/posts.entity';
import { LikeEntity } from '../../../../likes/domain/entitites/likes.entity';
import { BanInfoUserEntity } from './banInfoUser.entity';
import { CredInfoUserEntity } from './credInfoUser.entity';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  createdAt: string;

  @Column({ type: 'text', collation: 'C' })
  login: string;

  @Column({ type: 'text', collation: 'C' })
  email: string;

  @OneToOne(() => BanInfoUserEntity)
  banInfo: BanInfoUserEntity

  @OneToOne(() => CredInfoUserEntity)
  credInfo: CredInfoUserEntity

}
