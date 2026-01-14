import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
      const userExists = await this.usersRepository.findOne({where: {email: createUserDto.email}});

      if(userExists){
        throw new BadRequestException('User with this email already exists');
      }

      return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find(
      {
        relations: [
          'category_id',
          'category_id.category',
        ],
      }
    );
  }
  allUsers(){
    return this.usersRepository.find();
  }
  
  findOne(id: number) {
    return this.usersRepository.findOne({ where: {id}, relations: ['category_id', 'category_id.category'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
