import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => ProjectDto)
  public async findOneProject(@Args('id') id: string): Promise<ProjectDto> {
    return await this.projectService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProjectDto)
  public async deleteProject(@Args('id') id: string): Promise<ProjectDto> {
    return await this.projectService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProjectDto)
  public async updateProject(
    @Args('id') id: string,
    @Args('input') input: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return await this.projectService.update(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProjectDto)
  public async createProject(
    @Args('input') input: CreateProjectDto,
  ): Promise<ProjectDto> {
    return await this.projectService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ProjectDto])
  public async findAllProject(): Promise<ProjectDto[]> {
    return await this.projectService.findAll();
  }
}
