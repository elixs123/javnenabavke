import { Category } from './entities/categories.entity';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserToCategory } from './entities/userToCategory.entity';
import { HttpService } from '@nestjs/axios';
import { Tenders } from './entities/tenders.entity';
export declare class CategoryService {
    private categoryRepository;
    private usersRepository;
    private userToCategoryRepository;
    private userToCategory;
    private tendersRepository;
    private readonly httpService;
    private dataSource;
    constructor(categoryRepository: Repository<Category>, usersRepository: Repository<User>, userToCategoryRepository: Repository<UserToCategory>, userToCategory: Repository<UserToCategory>, tendersRepository: Repository<Tenders>, httpService: HttpService, dataSource: DataSource);
    create(): Promise<void>;
    addCategoryToUser(userId: number, categoryId: number): Promise<{
        message: string;
        data: UserToCategory;
        status: number;
    }>;
    findAll(): Promise<Category[]>;
    searchCategories(term: string): Promise<Category[]>;
    removeOne(userId: number, categoryId: number): Promise<import("typeorm").DeleteResult>;
    allTenders(userId: number): Promise<Tenders[]>;
}
