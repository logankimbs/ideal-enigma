import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../tag";
import { User } from "../user/user.entity";
import { CreateInsightDto } from "./dto/create-insight.dto";
import { MarkInsightSummarized } from "./dto/insight-summarized.dto";
import { Insight } from "./insight.entity";

@Injectable()
export class InsightService {
  constructor(
    @InjectRepository(Insight) private insightRepository: Repository<Insight>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}

  // Create insight and tags. Tags are passed in as an array of strings i.e., ["tag1", "tag2"]
  async create(createInsightDto: CreateInsightDto): Promise<Insight> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: createInsightDto.userId },
    });

    let tags: Tag[] = [];
    if (createInsightDto.tags && createInsightDto.tags.length > 0) {
      const existingTags = await this.tagRepository.find({
        where: createInsightDto.tags.map((tagText) => ({ text: tagText })),
      });

      // Create a Set of existing tag for quick lookup
      const existingTagTexts = new Set(existingTags.map((tag) => tag.text));

      // Identify tags that don't exist yet
      const newTagsData = createInsightDto.tags
        .filter((tagText) => !existingTagTexts.has(tagText))
        .map((tagText) => this.tagRepository.create({ text: tagText }));

      // Save new tags in one batch if there are any
      if (newTagsData.length > 0) {
        const newTags = await this.tagRepository.save(newTagsData);
        tags = [...existingTags, ...newTags];
      } else {
        tags = existingTags;
      }
    }

    const insight = new Insight();
    insight.user = user;
    insight.text = createInsightDto.text;
    insight.tags = tags;
    insight.link = createInsightDto.link || "";

    return await this.insightRepository.save(insight);
  }

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
