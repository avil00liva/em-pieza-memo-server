import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Med {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  med_name: string;

  @Column()
  med_type: string;

  @Column()
  amount: string;

  @Column()
  med_start: Date;

  @Column()
  test: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
