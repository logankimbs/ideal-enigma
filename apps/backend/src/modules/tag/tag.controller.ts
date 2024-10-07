import { Controller, Get } from "@nestjs/common";
import { Tag } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }
}
