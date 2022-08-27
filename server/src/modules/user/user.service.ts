import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckValidObjectID } from '../../utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  public async findAll(): Promise<UserDto[]> {
    try {
      return await this.userRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id): Promise<UserDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const user = await this.userRepo.findOne(id);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: CreateUserDto): Promise<UserDto> {
    try {
      let newUser = this.userRepo.create(input);
      newUser = await this.userRepo.save(newUser);

      return newUser;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async update(id: string, input: UpdateUserDto): Promise<UserDto> {
    try {
      if (!id) {
        throw new BadRequestException('ID required');
      } else if (!input) {
        throw new BadRequestException(
          'At least one property is needed to update',
        );
      }

      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const userExist = await this.userRepo.findOne(id);

      if (!userExist) {
        throw new BadRequestException('User not found');
      }

      const newUser = {
        ...userExist,
        ...input,
      };

      return await this.userRepo.save(newUser);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<UserDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const userExist = await this.userRepo.findOne(id);

      if (!userExist) {
        throw new BadRequestException('User not found');
      }

      await this.userRepo.delete({ _id: userExist._id });

      return userExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
