import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('ban_info_users')
export class BanInfoUserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  isBanned: boolean;

  @Column({type: 'timestamp with time zone', nullable: true})
  banDate: string;

  @Column({type: 'text', nullable: true})
  banReason: string;

  @Column('uuid')
  userId: string;

  @OneToOne(() => UserEntity, {onDelete: 'CASCADE'})
  @JoinColumn()
  user: UserEntity

}
