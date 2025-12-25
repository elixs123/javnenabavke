import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './categories.entity';

@Entity('user_to_category')
export class UserToCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
  
  @Column({ default: () => 'GETDATE()' })
  created_at: Date;
}


