import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { UserToCategory } from './userToCategory.entity';
import { Tenders } from './tenders.entity';
import { AllTenders } from './alltenders.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserToCategory, (category) => category.user)
  category_id: UserToCategory[];

  @OneToMany(() => AllTenders, tender => tender.user)
  tenders: AllTenders[];
}
