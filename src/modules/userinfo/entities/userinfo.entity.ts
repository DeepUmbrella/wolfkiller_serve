import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Userinfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
    nullable: false,
    default: '123456',
  })
  password: string;

  @Column({ nullable: false })
  telnumber: number;

  @Column({ type: 'varchar', length: 255 })
  avatarUrl: string;

  @CreateDateColumn()
  createDate;
}
