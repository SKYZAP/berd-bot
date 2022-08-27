import { CreatePerkDto } from './dto/create-perk.dto';
import { PerkDto } from './dto/perk.dto';
import { UpdatePerkDto } from './dto/update-perk.dto';
import { PerkService } from './perk.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver()
export class PerkResolver {
  constructor(private readonly perkService: PerkService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => PerkDto)
  public async findOnePerk(@Args('id') id: string): Promise<PerkDto> {
    return await this.perkService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => PerkDto)
  public async deletePerk(@Args('id') id: string): Promise<PerkDto> {
    return await this.perkService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => PerkDto)
  public async updatePerk(
    @Args('id') id: string,
    @Args('input') input: UpdatePerkDto,
  ): Promise<PerkDto> {
    return await this.perkService.update(id, input);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => PerkDto)
  public async createPerk(
    @Args('input') input: CreatePerkDto,
  ): Promise<PerkDto> {
    return await this.perkService.create(input);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [PerkDto])
  public async findAllPerk(): Promise<PerkDto[]> {
    return await this.perkService.findAll();
  }
}
