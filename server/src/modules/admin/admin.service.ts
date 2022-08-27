import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcryptjs';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CheckValidEmail, CheckValidObjectID } from '../../utils';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepo: AdminRepository,
  ) {}

  public async findAll(): Promise<AdminDto[]> {
    try {
      return await this.adminRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id: string): Promise<AdminDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const admin = await this.adminRepo.findOne(id);
      if (!admin) {
        throw new BadRequestException('Admin not found');
      }

      return admin;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: LoginAdminDto): Promise<AdminDto> {
    try {
      const { email, password } = input;
      const admin = await this.adminRepo.findOne({ email });

      const isValidEmail = CheckValidEmail(email);

      if (admin) {
        throw new BadRequestException('Email is already in use');
      } else if (!isValidEmail) {
        throw new BadRequestException('Invalid email');
      }

      let newAdmin = {
        email,
        password,
      };

      newAdmin = await this.adminRepo.create(newAdmin);

      return await this.adminRepo.save(newAdmin);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOneFromEmail(email: string): Promise<AdminDto> {
    try {
      const admin = await this.adminRepo.findOne({ email });

      if (!admin) {
        throw new BadRequestException('Admin not found');
      }

      return admin;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<AdminDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const adminExist = await this.adminRepo.findOne(id);

      if (!adminExist) {
        throw new BadRequestException('Admin not found');
      }

      await this.adminRepo.delete({ _id: adminExist._id });

      return adminExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async checkPassword(
    plainPass: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPass, hash);
  }
}
