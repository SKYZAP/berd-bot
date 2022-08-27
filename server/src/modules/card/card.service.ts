import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckValidObjectID } from '../../utils';
import { CreateCardDto } from './dto/create-card.dto';
import { CardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardRepository } from './card.repository';
import _ from 'lodash';
import { RarityType } from '../../constants';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepo: CardRepository,
  ) {}

  public async findAll(): Promise<CardDto[]> {
    try {
      return await this.cardRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id): Promise<CardDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const card = await this.cardRepo.findOne(id);

      if (!card) {
        throw new BadRequestException('Card not found');
      }

      return card;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: CreateCardDto): Promise<CardDto> {
    try {
      // Get all Perks & Randomize based off card rarity
      const rarityLength = Object.keys(RarityType).length;
      const randomRarity = Math.floor(Math.random() * rarityLength);

      // Additional Stats based off rarity
      let addStr,
        addDex,
        addCon,
        addInt,
        addWis,
        addCha = 0;

      // Assign additional stats
      switch (RarityType[randomRarity]) {
        case RarityType.Uncommon: {
          addStr += 2;
          addDex += 2;
          addCon += 2;
          addInt += 2;
          addWis += 2;
          addCha += 2;
          break;
        }
        case RarityType.Artisan: {
          addStr += 3;
          addDex += 3;
          addCon += 3;
          addInt += 3;
          addWis += 3;
          addCha += 3;
          break;
        }
        case RarityType.Epic: {
          addStr += 4;
          addDex += 4;
          addCon += 4;
          addInt += 4;
          addWis += 4;
          addCha += 4;
          break;
        }
        case RarityType.Legendary: {
          addStr += 5;
          addDex += 5;
          addCon += 5;
          addInt += 5;
          addWis += 5;
          addCha += 5;
          break;
        }
      }

      // Card Input with rarity & stats
      const cardInput = {
        ...input,
        level: 0,
        strength: input.strength + addStr,
        dexterity: input.dexterity + addDex,
        constitution: input.constitution + addCon,
        intelligence: input.intelligence + addInt,
        wisdom: input.wisdom + addWis,
        charisma: input.charisma + addCha,
        rarity: RarityType[randomRarity],
      };

      let newCard = this.cardRepo.create(cardInput);
      newCard = await this.cardRepo.save(newCard);

      return newCard;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async update(id: string, input: UpdateCardDto): Promise<CardDto> {
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

      const cardExist = await this.cardRepo.findOne(id);

      if (!cardExist) {
        throw new BadRequestException('Card not found');
      }

      const newCard = {
        ...cardExist,
        ...input,
      };

      return await this.cardRepo.save(newCard);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<CardDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const cardExist = await this.cardRepo.findOne(id);

      if (!cardExist) {
        throw new BadRequestException('Card not found');
      }

      await this.cardRepo.delete({ _id: cardExist._id });

      return cardExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
