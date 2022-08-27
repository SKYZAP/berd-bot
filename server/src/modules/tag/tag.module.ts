import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  providers: [TagService, TagResolver],
  exports: [TagService],
})
export class TagModule {}
