import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, nullable: false })
  name: string;

  @Column()
  permission: boolean;

  @Column({ default: 0 })
  level: number;

  @UpdateDateColumn()
  outTime;

  @CreateDateColumn()
  createDate;
}
