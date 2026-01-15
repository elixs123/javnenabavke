import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category  } from './entities/categories.entity';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserToCategory } from './entities/userToCategory.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CategoryResponse } from 'src/interfaces/allInterfaces';
import { Tenders } from './entities/tenders.entity';

@Injectable()
export class CategoryService {
    constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserToCategory)
    private userToCategoryRepository: Repository<UserToCategory>,
    @InjectRepository(UserToCategory)
    private userToCategory: Repository<UserToCategory>,
    @InjectRepository(Tenders)
    private tendersRepository: Repository<Tenders>,
    private readonly httpService: HttpService,
    private dataSource: DataSource
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

    async addCategoryToUser(userId: number, categoryId: number, rootAccepted: string) {
        const user = await this.usersRepository.findOne({where: {id: userId}});

        const category = await this.categoryRepository.findOne({where: {id: categoryId}});

        if(!category || !user){
            throw new BadRequestException('Category or user not found');
        }

        if(!category.rootId){
            category.rootId = category.CpvCodeId;
           // throw new BadRequestException('Root category not found');   
        }

        const categoryRoot = await this.categoryRepository.find({where: [
            {rootId: category.rootId},
            {CpvCodeId: category.rootId}
        ]});

        if(rootAccepted == 'T'){
            for(var x = 0; x < categoryRoot.length; x++){
                const userToCategory = new UserToCategory();
                userToCategory.user = user;
                userToCategory.category = categoryRoot[x];
                userToCategory.categoryRootId = categoryRoot[x].rootId? categoryRoot[x].rootId : categoryRoot[x].CpvCodeId;
                if(categoryRoot[x].CpvCodeId == category.CpvCodeId){
                    userToCategory.isMain = 'T';
                }else{
                    userToCategory.isMain = 'F';
                }

                const exists = await this.userToCategoryRepository.findOne({
                    where: {
                        user: { id: userId },
                        category: { CpvCodeId: categoryRoot[x].CpvCodeId }
                    },
                });

                if (exists) {
                    throw new BadRequestException('Category already assigned to user');
                }
                
                await this.userToCategoryRepository.save(userToCategory);
            }
        }else{
            const userToCategory = new UserToCategory();
            userToCategory.user = user;
            userToCategory.category = category;
            userToCategory.categoryRootId = category.rootId? category.rootId : category.CpvCodeId;
            if(category.CpvCodeId == category.CpvCodeId){
                userToCategory.isMain = 'T';
            }else{
                userToCategory.isMain = 'F';
            }

            const exists = await this.userToCategoryRepository.findOne({
                where: {
                    user: { id: userId },
                    category: { CpvCodeId: category.CpvCodeId }
                },
            });

            if (exists) {
                throw new BadRequestException('Category already assigned to user');
            }
            
            await this.userToCategoryRepository.save(userToCategory)
            .catch((error) => {
                console.log(error);
            })
        }

        return {
            message: 'Category added to user successfully',
            status: 200
        };
    }

    async findAll() {
        return  this.categoryRepository.find();
    }

    async searchCategories(term: string) {
        return await this.categoryRepository.createQueryBuilder('category')
            .where('category.name LIKE :term OR category.code LIKE :term', { term: `%${term}%` })
            .getMany();
    }

    async removeOne(userId:number, categoryId: number) {
        return await this.dataSource
            .createQueryBuilder()
            .delete()
            .from('user_to_category') 
            .where('userId = :userId AND categoryId = :categoryId', { userId, categoryId })
            .execute();
    }

    async allTenders(userId: number){
        return await this.tendersRepository.find({where: {userId: userId}});
    }
}
