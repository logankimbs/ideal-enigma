import { TeamStats } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team as SlackTeam } from '@slack/web-api/dist/types/response/TeamInfoResponse';
import { Repository } from 'typeorm';
import {
  calculateChange,
  parseNumber,
  sumValues,
} from '../../common/utils/number.utils';
import { Team } from '../../infra/database/entities/team.entity';
import { getTeamStatsQuery, TeamStatsQuery } from './teams.queries';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>
  ) {}

  async create(team: SlackTeam): Promise<Team> {
    return await this.teamRepository.save({ id: team.id, data: team });
  }

  findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async find(id: string): Promise<Team> {
    return await this.teamRepository.findOneOrFail({
      where: { id },
      relations: ['users'],
    });
  }

  async getTeamStats(teamId: string): Promise<TeamStats> {
    const query = getTeamStatsQuery();
    const stats: TeamStatsQuery[] = await this.teamRepository.query(query, [
      teamId,
    ]);

    const current = stats[0] || ({} as TeamStatsQuery);
    const previous = stats[1] || ({} as TeamStatsQuery);

    // Calculate total insights and change
    const totalValue = parseNumber(current.insight_count);
    const totalPrev = parseNumber(previous.insight_count);
    let totalChange = calculateChange(totalValue, totalPrev);

    // Calculate total themes and change
    const themesValue = parseNumber(current.tag_count);
    const themesPrev = parseNumber(previous.tag_count);
    let themesChange = calculateChange(themesValue, themesPrev);

    // Calculate average insights per user and change
    const sumAverage = sumValues(stats, 'avg_insights_per_user');
    const averageValue = sumAverage / stats.length;
    // Use only the second element onward to approximate "previous" average
    const sumAveragePrev = sumValues(stats.slice(1), 'avg_insights_per_user');
    const averageValuePrev = sumAveragePrev / (stats.length - 1);
    let averageChange = calculateChange(averageValue, averageValuePrev);

    // Calculate active contributors and change
    const contributorsValue = parseNumber(current.active_contributors);
    const contributorsPrev = parseNumber(previous.active_contributors);
    let contributorsChange = calculateChange(
      contributorsValue,
      contributorsPrev
    );

    if (stats.length < 2) {
      totalChange = 0.0;
      themesChange = 0.0;
      averageChange = 0.0;
      contributorsChange = 0.0;
    }

    return {
      totalInsights: {
        value: totalValue.toString(),
        change: totalChange.toFixed(2),
      },
      totalThemes: {
        value: themesValue.toString(),
        change: themesChange.toFixed(2),
      },
      averageInsights: {
        value: averageValue.toFixed(2),
        change: averageChange.toFixed(2),
      },
      activeContributors: {
        value: contributorsValue.toString(),
        change: contributorsChange.toFixed(2),
      },
    };
  }
}
