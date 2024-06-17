import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'dd_damocle_user',
})
export class DdDamocle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 11,
    nullable: false,
  })
  phone: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  password: string;

  @Column({
    default: '',
    type: 'varchar',
  })
  email: string;

  @CreateDateColumn({
    nullable: false,
  })
  createTime: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updateTime: Date;
}
