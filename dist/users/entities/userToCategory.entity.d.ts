import { User } from './user.entity';
import { Category } from './categories.entity';
export declare class UserToCategory {
    id: number;
    user: User;
    category: Category;
    categoryRoot: Category;
    created_at: Date;
}
