import { Controller, Get } from "@nestjs/common";
import { TagService } from "./tag.service";
import { Tag } from "./tag.entity";

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }
}