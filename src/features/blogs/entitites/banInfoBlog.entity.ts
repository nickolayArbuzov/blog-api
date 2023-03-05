import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './blogs.entity';

@Entity('ban_info_blogs')
export class BanInfoBlogEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  isBanned: boolean;

  @Column({type: 'timestamp with time zone', nullable: true})
  banDate: string;

  @Column('uuid')
  blogId: string;

  @OneToOne(() => BlogEntity, {onDelete: 'CASCADE'})
  @JoinColumn()
  blog: BlogEntity

}
