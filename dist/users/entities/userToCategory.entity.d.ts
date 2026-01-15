import { User } from './user.entity';
import { Category } from './categories.entity';
export declare class UserToCategory {
    id: number;
    user: User;
    category: Category;
    categoryRootId: number;
    isMain: string;
    created_at: Date;
}
