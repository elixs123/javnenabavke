import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserToCategory } from './entities/userToCategory.entity';
import { HttpService } from '@nestjs/axios';
export declare class CategoryService {
    private categoryRepository;
    private usersRepository;
    private userToCategoryRepository;
    private readonly httpService;
    constructor(categoryRepository: Repository<Category>, usersRepository: Repository<User>, userToCategoryRepository: Repository<UserToCategory>, httpService: HttpService);
    create(): Promise<void>;
    addCategoryToUser(userId: number, categoryId: number): Promise<{
        message: string;
        data: UserToCategory;
        status: number;
    }>;
    findAll(): Promise<Category[]>;
    searchCategories(term: string): Promise<Category[]>;
}
