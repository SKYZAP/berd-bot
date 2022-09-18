import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BerdbotGateway } from './berdbot.gateway';
import { PingCommand } from './commands/ping.command';
import { PlayCommand } from './commands/music/play.command';
import { SlapCommand } from './commands/slap.command';
import { StopCommand } from './commands/music/stop.command';
import { ClearCommand } from './commands/music/clear.command';
import { PauseCommand } from './commands/music/pause.command';
import { ResumeCommand } from './commands/music/resume.command';
import { SkipCommand } from './commands/music/skip.command';
import { QueueCommand } from './commands/music/queue.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [
    BerdbotGateway,
    PingCommand,
    SlapCommand,
    PlayCommand,
    StopCommand,
    ClearCommand,
    PauseCommand,
    ResumeCommand,
    SkipCommand,
    QueueCommand,
  ],
})
export class BerdbotModule {}
