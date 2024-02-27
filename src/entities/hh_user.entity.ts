import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Machine } from './machine.entity';
@Entity()
export class HH_User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, nullable: false })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
    nullable: false,
    default: '123456',
  })
  password: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  mac_id: string;

  @Column({ default: true })
  enable: boolean;

  @CreateDateColumn()
  createDate;
}
