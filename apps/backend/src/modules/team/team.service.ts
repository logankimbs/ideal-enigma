import { TeamStats } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team as SlackTeam } from '@slack/web-api/dist/types/response/TeamInfoResponse';
import { Repository } from 'typeorm';
import {
  calculateAverage,
  calculateChange,
  parseNumber,
} from '../../common/utils';
import { Team } from './team.entity';
import { getTeamStatsQuery, TeamStatsQuery } from './team.queries';

@Injectable()
export class TeamService {
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

    console.log('stats', stats);

    const current = stats[0] || ({} as TeamStatsQuery);
    const previous = stats[1] || ({} as TeamStatsQuery);

    // Calculate total insights and change
    const totalValue = parseNumber(current.insight_count);
    const totalPrev = parseNumber(previous.insight_count);
    const totalChange = calculateChange(totalValue, totalPrev).toFixed(2);

    // Calculate total themes and change
    const themesValue = parseNumber(current.tag_count);
    const themesPrev = parseNumber(previous.tag_count);
    const themesChange = calculateChange(themesValue, themesPrev).toFixed(2);

    // Calculate average insights and change
    const averageValue = calculateAverage(stats);
    // Use only the second element onward to approximate "previous" average
    const averageValuePrevious = calculateAverage(stats.slice(1));
    const averageChange = calculateChange(
      averageValue,
      averageValuePrevious
    ).toFixed(2);

    // Calculate active contributors and change
    const contributorsValue = parseNumber(current.active_contributors);
    const contributorsPrev = parseNumber(previous.active_contributors);
    const contributorsChange = calculateChange(
      contributorsValue,
      contributorsPrev
    ).toFixed(2);

    return {
      totalInsights: { value: totalValue.toString(), change: totalChange },
      totalThemes: { value: themesValue.toString(), change: themesChange },
      averageInsights: {
        value: averageValue.toFixed(2),
        change: averageChange,
      },
      activeContributors: {
        value: contributorsValue.toString(),
        change: contributorsChange,
      },
    };
  }
}
