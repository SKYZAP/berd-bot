import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerService } from './player.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AddPlayerCardDto } from './dto/add-player-card.dto';

@Resolver()
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => PlayerDto)
  public async findOnePlayer(@Args('id') id: string): Promise<PlayerDto> {
    return await this.playerService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => PlayerDto)
  public async deletePlayer(@Args('id') id: string): Promise<PlayerDto> {
    return await this.playerService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => PlayerDto)
  public async updatePlayer(
    @Args('id') id: string,
    @Args('input') input: UpdatePlayerDto,
  ): Promise<PlayerDto> {
    return await this.playerService.update(id, input);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => PlayerDto)
  public async createPlayer(
    @Args('input') input: CreatePlayerDto,
  ): Promise<PlayerDto> {
    return await this.playerService.create(input);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [PlayerDto])
  public async findAllPlayer(): Promise<PlayerDto[]> {
    return await this.playerService.findAll();
  }

  @Mutation(() => PlayerDto)
  public async addPlayerCard(
    @Args('input') input: AddPlayerCardDto,
  ): Promise<PlayerDto> {
    return await this.playerService.addPlayerCard(input);
  }
}
