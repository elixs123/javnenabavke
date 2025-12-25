import { UserToCategory } from './userToCategory.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    category_id: UserToCategory[];
}
