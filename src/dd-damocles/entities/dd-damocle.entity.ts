import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'datetime',
    nullable: false,
  })
  createTime: Date;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  updateTime: Date;
}
