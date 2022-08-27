import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckValidObjectID } from '../../utils';
import { CreatePerkDto } from './dto/create-perk.dto';
import { PerkDto } from './dto/perk.dto';
import { UpdatePerkDto } from './dto/update-perk.dto';
import { PerkRepository } from './perk.repository';

@Injectable()
export class PerkService {
  constructor(
    @InjectRepository(PerkRepository)
    private perkRepo: PerkRepository,
  ) {}

  public async findAll(): Promise<PerkDto[]> {
    try {
      return await this.perkRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id): Promise<PerkDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const perk = await this.perkRepo.findOne(id);

      if (!perk) {
        throw new BadRequestException('Perk not found');
      }

      return perk;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: CreatePerkDto): Promise<PerkDto> {
    try {
      let newPerk = this.perkRepo.create(input);
      newPerk = await this.perkRepo.save(newPerk);

      return newPerk;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async update(id: string, input: UpdatePerkDto): Promise<PerkDto> {
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

      const perkExist = await this.perkRepo.findOne(id);

      if (!perkExist) {
        throw new BadRequestException('Perk not found');
      }

      const newPerk = {
        ...perkExist,
        ...input,
      };

      return await this.perkRepo.save(newPerk);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<PerkDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const perkExist = await this.perkRepo.findOne(id);

      if (!perkExist) {
        throw new BadRequestException('Perk not found');
      }

      await this.perkRepo.delete({ _id: perkExist._id });

      return perkExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
