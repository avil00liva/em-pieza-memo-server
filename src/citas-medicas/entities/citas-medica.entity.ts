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
export class CitasMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  establecimiento: string;

  @Column()
  cita: string;

  @Column({ nullable: true })
  memo: string;

  @Column()
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;

  @DeleteDateColumn()
  daletedAt: Date;
}
