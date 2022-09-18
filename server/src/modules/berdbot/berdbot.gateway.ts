import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import { Player } from 'discord-player';

@Injectable()
export class BerdbotGateway {
  private readonly logger = new Logger(BerdbotGateway.name);
  private player;

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  getPlayer() {
    return this.player;
  }

  @Once('ready')
  onReady() {
    this.player = new Player(this.client);
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }
}
