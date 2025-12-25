import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column({ default: null})
  rootId: number;

  @Column({ default: null})
  rootCode: string;

  @Column({ default: null})
  rootDescription: string;

  @Column({ default: null})
  CpvCodeId: number;
}
