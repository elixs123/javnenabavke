"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("./entities/categories.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const userToCategory_entity_1 = require("./entities/userToCategory.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CategoryService = class CategoryService {
    categoryRepository;
    usersRepository;
    userToCategoryRepository;
    httpService;
    constructor(categoryRepository, usersRepository, userToCategoryRepository, httpService) {
        this.categoryRepository = categoryRepository;
        this.usersRepository = usersRepository;
        this.userToCategoryRepository = userToCategoryRepository;
        this.httpService = httpService;
    }
    async create() {
        let hasMore = false;
        let limit = 0;
        while (!hasMore) {
            const url = 'https://open.ejn.gov.ba/CpvCodes?$skip=' + limit;
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
            await this.categoryRepository.save(response.data.value.map((cpv) => {
                const category = new categories_entity_1.Category();
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
            if (!response.data.value.length) {
                console.log("No more CPV codes to fetch");
                hasMore = true;
            }
        }
    }
    async addCategoryToUser(userId, categoryId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category || !user) {
            throw new common_1.BadRequestException('Category or user not found');
        }
        const userToCategory = new userToCategory_entity_1.UserToCategory();
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
        return this.categoryRepository.find();
    }
    async searchCategories(term) {
        return await this.categoryRepository.createQueryBuilder('category')
            .where('category.name LIKE :term OR category.code LIKE :term', { term: `%${term}%` })
            .getMany();
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(userToCategory_entity_1.UserToCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], CategoryService);
//# sourceMappingURL=category.service.js.map