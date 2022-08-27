import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from '../tag/tag.repository';
import { TagService } from '../tag/tag.service';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository, TagRepository])],
  providers: [ProjectService, ProjectResolver, TagService],
  exports: [ProjectService],
})
export class ProjectModule {}
