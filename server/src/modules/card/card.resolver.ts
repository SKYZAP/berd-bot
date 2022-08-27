import { CreateCardDto } from './dto/create-card.dto';
import { CardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardService } from './card.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver()
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => CardDto)
  public async findOneCard(@Args('id') id: string): Promise<CardDto> {
    return await this.cardService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => CardDto)
  public async deleteCard(@Args('id') id: string): Promise<CardDto> {
    return await this.cardService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => CardDto)
  public async updateCard(
    @Args('id') id: string,
    @Args('input') input: UpdateCardDto,
  ): Promise<CardDto> {
    return await this.cardService.update(id, input);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => CardDto)
  public async createCard(
    @Args('input') input: CreateCardDto,
  ): Promise<CardDto> {
    return await this.cardService.create(input);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [CardDto])
  public async findAllCard(): Promise<CardDto[]> {
    return await this.cardService.findAll();
  }
}
