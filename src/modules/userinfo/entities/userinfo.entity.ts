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
  user_name: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 32,
    select: true,
    nullable: false,
    default: '123456',
  })
  password: string;

  @Column({ nullable: false, length: 11 })
  phone_number: string;

  @Column({ type: 'int', default: 0b0000 })
  prefix: number;

  @Column({ type: 'int', default: 0b0000 })
  permission: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  avatarUrl: string;

  @CreateDateColumn()
  createDate;
}
