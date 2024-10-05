import { Insight } from "@idealgma/common";
import { Controller, Get } from "@nestjs/common";
import { InsightService } from "./insight.service";

@Controller("insight")
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Get()
  async findAll(): Promise<Insight[]> {
    return await this.insightService.findAll();
  }
}
