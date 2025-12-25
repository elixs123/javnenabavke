import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category  } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserToCategory } from './entities/userToCategory.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CategoryResponse } from 'src/interfaces/allInterfaces';

@Injectable()
export class CategoryService {
    constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserToCategory)
    private userToCategoryRepository: Repository<UserToCategory>,
    private readonly httpService: HttpService
    ){}
    async create() {
        let hasMore = false;

        let limit = 0;

        while(!hasMore){
            const url = 'https://open.ejn.gov.ba/CpvCodes?$skip=' + limit;
            const response = await lastValueFrom(
                this.httpService.get<CategoryResponse>(url),
            );

            await this.categoryRepository.save(response.data.value.map((cpv) => {
                const category = new Category();
                category.CpvCodeId = cpv.Id;
                category.code = cpv.Code;
                category.name = cpv.Description;
                category.description = cpv.Description;
                category.rootCode = cpv.RootCode;
                category.rootDescription = cpv.RootDescription;
                category.rootId = cpv.RootId;
                return category;
            }));

            limit += 50;

            console.log(`Fetched ${response.data.value.length} CPV codes limit je` + limit);

            if(!response.data.value.length){
                console.log("No more CPV codes to fetch");
                hasMore = true;
            }

        }
    }

    async addCategoryToUser(userId: number, categoryId: number) {
        const user = await this.usersRepository.findOne({where: {id: userId}});

        const category = await this.categoryRepository.findOne({where: {id: categoryId}});
        if(!category || !user){
            throw new BadRequestException('Category or user not found');
        }

        const userToCategory = new UserToCategory();
        userToCategory.user = user;
        userToCategory.category = category;
        
        await this.userToCategoryRepository.save(userToCategory);

        return {
            message: 'Category added to user successfully',
            data: userToCategory,
            status: 200
        };
    }

    async findAll() {
        return  this.categoryRepository.find(
            
        );
    }

    async searchCategories(term: string) {
        return await this.categoryRepository.createQueryBuilder('category')
            .where('category.name LIKE :term OR category.code LIKE :term', { term: `%${term}%` })
            .getMany();
    }
}
