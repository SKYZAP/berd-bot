import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@ObjectType()
class JWTPayload {
  @Field()
  access_token: string;
}

@Resolver()
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => JWTPayload)
  async loginAdmin(@Args('input') input: LoginAdminDto) {
    return this.authService.loginWithCredentials(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AdminDto)
  async findOneAdmin(@Args('id') id: string): Promise<AdminDto> {
    return await this.adminService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AdminDto)
  async deleteAdmin(@Args('id') id: string): Promise<AdminDto> {
    return await this.adminService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AdminDto])
  async findAllAdmin(): Promise<AdminDto[]> {
    return await this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AdminDto)
  async createAdmin(@Args('input') input: CreateAdminDto): Promise<AdminDto> {
    return await this.adminService.create(input);
  }
}
