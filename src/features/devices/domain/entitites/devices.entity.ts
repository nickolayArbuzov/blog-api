import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('devices')
export class DeviceEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  ip: string;

  @Column('text')
  title: string;

  @Column('uuid')
  deviceId: boolean;

  @Column('bigint')
  issuedAt: string;

  @Column('bigint')
  expiresAt: string;

  @Column('uuid')
  userId: string;

}
