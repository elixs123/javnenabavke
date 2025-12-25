import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CategoryService } from './category.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { UserToCategory } from './entities/userToCategory.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, UserToCategory, CategoryService]), HttpModule],
  controllers: [UsersController],
  providers: [UsersService, CategoryService],
})
export class UsersModule {}
