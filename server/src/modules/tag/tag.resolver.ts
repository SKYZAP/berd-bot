import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => TagDto)
  public async findOneTag(@Args('id') id: string): Promise<TagDto> {
    return await this.tagService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TagDto)
  public async deleteTag(@Args('id') id: string): Promise<TagDto> {
    return await this.tagService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TagDto)
  public async updateTag(
    @Args('id') id: string,
    @Args('input') input: UpdateTagDto,
  ): Promise<TagDto> {
    return await this.tagService.update(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TagDto)
  public async createTag(@Args('input') input: CreateTagDto): Promise<TagDto> {
    return await this.tagService.create(input);
  }

  @Query(() => [TagDto])
  public async findAllTag(): Promise<TagDto[]> {
    return await this.tagService.findAll();
  }
}
