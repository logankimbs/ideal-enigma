import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MarkInsightSummarized } from "./dto/insight-summarized.dto";
import { Insight } from "./insight.entity";

@Injectable()
export class InsightService {
  constructor(
    @InjectRepository(Insight)
    private insightRepository: Repository<Insight>,
  ) {}

  findAll(): Promise<Insight[]> {
    return this.insightRepository.find();
  }

  async getRecentUnsummarizedInsightsForTeam(
    id: string,
    oneMonthAgo: Date,
  ): Promise<Insight[]> {
    const insights = await this.insightRepository
      .createQueryBuilder("insights")
      .leftJoinAndSelect("insights.user", "users")
      .leftJoinAndSelect("users.team", "teams")
      .where("teams.id = :teamId", { teamId: id })
      .andWhere("insights.isSummarized = false")
      .andWhere("insights.createdAt > :oneMonthAgo", { oneMonthAgo })
      .getMany();

    return insights;
  }

  async markInsightsAsSummarized(
    markInsightSummarized: MarkInsightSummarized,
  ): Promise<void> {
    markInsightSummarized.insights.forEach((insight) => {
      insight.isSummarized = true;
    });

    await this.insightRepository.save(markInsightSummarized.insights);
  }
}
