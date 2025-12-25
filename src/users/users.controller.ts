import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CategoryService } from './category.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateCategoryDto } from './dto/create-categories.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService , private readonly categoyService: CategoryService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('categories')
  createCategory() {
    return this.categoyService.create();
  }

  @Get('categories')
  findAllCategories() {
    return this.categoyService.findAll();
  }

  @Get('categories/search')
  searchCategories(@Body() body: {searchTerm: string}) {
    return this.categoyService.searchCategories(body.searchTerm);
  }

  //Mapira usera za kategoriju
  @Post('add/category')
  addCategoryToUser(@Body() body: {userId: number, categoryId: number}) {
    return this.categoyService.addCategoryToUser(body.userId, body.categoryId);
  }
}
