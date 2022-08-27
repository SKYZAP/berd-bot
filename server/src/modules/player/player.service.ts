import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckValidObjectID } from '../../utils';
import { CardService } from '../card/card.service';
import { AddPlayerCardDto } from './dto/add-player-card.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepo: PlayerRepository,
    private cardService: CardService,
  ) {}

  public async findAll(): Promise<PlayerDto[]> {
    try {
      return await this.playerRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id): Promise<PlayerDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const player = await this.playerRepo.findOne(id);

      if (!player) {
        throw new BadRequestException('Player not found');
      }

      return player;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: CreatePlayerDto): Promise<PlayerDto> {
    try {
      let newPlayer = this.playerRepo.create(input);
      newPlayer = await this.playerRepo.save(newPlayer);

      return newPlayer;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async update(id: string, input: UpdatePlayerDto): Promise<PlayerDto> {
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

      const playerExist = await this.playerRepo.findOne(id);

      if (!playerExist) {
        throw new BadRequestException('Player not found');
      }

      const newPlayer = {
        ...playerExist,
        ...input,
      };

      return await this.playerRepo.save(newPlayer);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<PlayerDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const playerExist = await this.playerRepo.findOne(id);

      if (!playerExist) {
        throw new BadRequestException('Player not found');
      }

      await this.playerRepo.delete({ _id: playerExist._id });

      return playerExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async addPlayerCard(input: AddPlayerCardDto): Promise<PlayerDto> {
    try {
      const { playerId, cardId } = input;

      const playerExist = await this.playerRepo.findOne({ _id: playerId });

      if (!playerExist) {
        throw new BadRequestException('Player not found');
      }

      const cardExist = await this.cardService.findOne(cardId);

      if (!cardExist) {
        throw new BadRequestException('Card not found');
      }

      const newPlayer = {
        ...playerExist,
        cards: [...playerExist.cards, cardExist],
      };

      return await this.playerRepo.save(newPlayer);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
