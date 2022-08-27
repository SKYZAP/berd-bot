import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../constants';
import { TagDto } from '../tag/dto/tag.dto';

@Entity('projects')
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tags: TagDto[];
}
