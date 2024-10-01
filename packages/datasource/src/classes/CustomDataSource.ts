import { DataSource } from "typeorm";
import { InsightEntity, TagEntity, TeamEntity } from "../entities";
import { InsightRepository, TagRepository, TeamRepository } from "../repositories";

export class CustomDataSource extends DataSource {
    getInsightRepository() {
        return this.getRepository(InsightEntity).extend(InsightRepository.prototype) as InsightRepository
    }

    getTagRepository() {
        return this.getRepository(TagEntity).extend(TagRepository.prototype) as TagRepository
    }

    getTeamRepository() {
        return this.getRepository(TeamEntity).extend(TeamRepository.prototype) as TeamRepository
    }
}