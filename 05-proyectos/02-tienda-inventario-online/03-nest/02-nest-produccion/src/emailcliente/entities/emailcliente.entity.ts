import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Emailcliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  emailcliente: string;

  @Column({ default: '' })
  passcliente: string;

  @Column({ default: 1 })
  estado: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  updatedAt: Date;
}
