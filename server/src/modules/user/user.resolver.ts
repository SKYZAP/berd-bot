import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDto)
  public async findOneUser(@Args('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDto)
  public async deleteUser(@Args('id') id: string): Promise<UserDto> {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDto)
  public async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.update(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDto)
  public async createUser(
    @Args('input') input: CreateUserDto,
  ): Promise<UserDto> {
    return await this.userService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserDto])
  public async findAllUser(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }
}
