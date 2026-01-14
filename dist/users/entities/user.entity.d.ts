import { UserToCategory } from './userToCategory.entity';
import { AllTenders } from './alltenders.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    category_id: UserToCategory[];
    tenders: AllTenders[];
}
