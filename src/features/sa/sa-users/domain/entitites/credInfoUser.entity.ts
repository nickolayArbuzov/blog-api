import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('cred_info_users')
export class CredInfoUserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  passwordHash: string;

  @Column({type: 'text', nullable: true})
  passwordSalt: string;

  @Column('boolean')
  isActivated: boolean;

  @Column('text')
  code: string;

  @Column({type: 'uuid', nullable: true})
  userId: string;

  @OneToOne(() => UserEntity, {onDelete: 'CASCADE'})
  @JoinColumn()
  user: UserEntity

}
