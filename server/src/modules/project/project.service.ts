import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckValidObjectID } from '../../utils';
import { TagDto } from '../tag/dto/tag.dto';
import { TagService } from '../tag/tag.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './project.repository';
import _ from 'lodash';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepo: ProjectRepository,
    private tagService: TagService,
  ) {}

  public async findAll(): Promise<ProjectDto[]> {
    try {
      return await this.projectRepo.find();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async findOne(id): Promise<ProjectDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const project = await this.projectRepo.findOne(id);

      if (!project) {
        throw new BadRequestException('Project not found');
      }

      return project;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async create(input: CreateProjectDto): Promise<ProjectDto> {
    try {
      const tags = await Promise.all<TagDto>(
        _.map(input.tags, async (tag) => {
          return await this.tagService.create({ name: tag });
        }),
      );

      let newProject = {
        ...input,
        tags,
      };

      let project = this.projectRepo.create(newProject);

      return await this.projectRepo.save(project);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async update(
    id: string,
    input: UpdateProjectDto,
  ): Promise<ProjectDto> {
    try {
      let tags;

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

      const projectExist = await this.projectRepo.findOne(id);

      if (!projectExist) {
        throw new BadRequestException('Project not found');
      }

      if (input.tags?.length > 0)
        tags = await Promise.all<TagDto>(
          _.map(input.tags, async (tag) => {
            return await this.tagService.create({ name: tag });
          }),
        );

      const newProject = {
        ...projectExist,
        ...input,
        tags: tags ?? projectExist.tags,
      };

      return await this.projectRepo.save(newProject);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async delete(id: string): Promise<ProjectDto> {
    try {
      if (!CheckValidObjectID(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const projectExist = await this.projectRepo.findOne(id);

      if (!projectExist) {
        throw new BadRequestException('Project not found');
      }

      await this.projectRepo.delete({ _id: projectExist._id });

      return projectExist;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
