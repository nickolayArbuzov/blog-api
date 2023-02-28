import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blogger-users')
export class BloggerUserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  blogId: string;

  @Column('uuid')
  bannedUserId: string;

  @Column('timestamp with time zone')
  banDate: string;

  @Column('text')
  banReason: string;

}
