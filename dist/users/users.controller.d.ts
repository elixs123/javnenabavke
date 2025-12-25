import { UsersService } from './users.service';
import { CategoryService } from './category.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly categoyService;
    constructor(usersService: UsersService, categoyService: CategoryService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
    createCategory(): Promise<void>;
    findAllCategories(): Promise<import("./entities/categories.entity").Category[]>;
    searchCategories(searchTerm: string): Promise<import("./entities/categories.entity").Category[]>;
    addCategoryToUser(body: {
        userId: number;
        categoryId: number;
    }): Promise<{
        message: string;
        data: import("./entities/userToCategory.entity").UserToCategory;
        status: number;
    }>;
}
