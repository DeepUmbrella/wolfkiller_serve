import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  mac_id: string;

  @Column({ type: 'boolean', default: true })
  enable: boolean;

  @CreateDateColumn()
  createDate;
}
