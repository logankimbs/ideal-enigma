import { Controller, Get } from '@nestjs/common';
import { Tag } from '../../domain/entities/tag.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }
}
