import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CapitalizeFirstLetter, CheckValidObjectID } from '../../utils';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRepository)
    private tagRepo: TagRepository,
  ) {}

  public async findAll(): Promise<TagDto[]> {
    try {
      return await this.tagRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id): Promise<TagDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const tag = await this.tagRepo.findOne(id);

      if (!tag) {
        throw new BadRequestException('Tag not found');
      }

      return tag;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: CreateTagDto): Promise<TagDto> {
    try {
      const { name } = input;
      const newName = CapitalizeFirstLetter(name);
      const tag = await this.tagRepo.findOne({
        name: newName,
      });

      if (!tag) {
        let newTag = this.tagRepo.create({ name: newName });
        newTag = await this.tagRepo.save(newTag);

        return newTag;
      }

      return tag;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async update(id: string, input: UpdateTagDto): Promise<TagDto> {
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

      input.name = CapitalizeFirstLetter(input.name);
      const tagExist = await this.tagRepo.findOne(id);

      if (!tagExist) {
        throw new BadRequestException('Tag not found');
      }

      const newTag = {
        ...tagExist,
        ...input,
      };

      return await this.tagRepo.save(newTag);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<TagDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const tagExist = await this.tagRepo.findOne(id);

      if (!tagExist) {
        throw new BadRequestException('Tag not found');
      }

      await this.tagRepo.delete({ _id: tagExist._id });

      return tagExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
