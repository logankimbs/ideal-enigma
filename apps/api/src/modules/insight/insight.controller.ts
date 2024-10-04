import { Controller, Get } from "@nestjs/common";
import { InsightService } from "./insight.service";
import { Insight } from "./insight.entity";

@Controller("insight")
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Get()
  async findAll(): Promise<Insight[]> {
    const insights = await this.insightService.findAll();
    return insights;
  }
}
