import { SlackUser, UserStats } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as Installer } from '@slack/web-api/dist/types/response/UsersInfoResponse';
import { Member } from '@slack/web-api/dist/types/response/UsersListResponse';
import { Repository } from 'typeorm';
import {
  calculateAverage,
  calculateChange,
  parseNumber,
} from '../../common/utils/number.utils';
import { Team } from '../../infra/database/entities/team.entity';
import { User } from '../../infra/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userStatsQuery, UserStatsQuery } from './queries/user-stats.query';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Team) private teamRepository: Repository<Team>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['team'],
    });
  }

  // Called when user joins teams
  async createAndSendWelcomeMessage(
    createUserDto: CreateUserDto
  ): Promise<User> {
    const team = await this.teamRepository.findOneOrFail({
      where: { id: createUserDto.team_id },
    });

    const user = new User();
    user.id = createUserDto.id;
    user.data = createUserDto;
    user.team = team;
    user.onboardCompletedAt = new Date();
    // TODO: Need to address this later with settings page on dashboard.
    user.notifications = true; // Notifications are enabled when a user is added to team after install.

    // TODO: Send welcome message to new user
    return await this.userRepository.save(user);
  }

  async onboardUsers(members: Member[], team: Team): Promise<User[]> {
    const users: User[] = members.map((member) => {
      const user = new User();

      user.id = member.id;
      user.data = member as SlackUser;
      user.team = team;
      user.onboardCompletedAt = new Date();

      return user;
    });

    return this.userRepository.save(users);
  }

  async saveInstaller(installer: Installer, team: Team): Promise<User> {
    const user = new User();

    user.id = installer.id;
    user.data = installer as SlackUser;
    user.team = team;
    user.onboardCompletedAt = null;

    return this.userRepository.save(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.save({
      id: updateUserDto.id,
      data: updateUserDto,
    });
  }

  async getUsers(teamId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { team: { id: teamId } },
      relations: ['team'],
    });
  }

  async isOnboardingComplete(userId: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    return user.onboardCompletedAt !== null;
  }

  async batchEnableNotifications(userIds: string[]) {
    for (const id of userIds) {
      const user = await this.userRepository.findOneBy({ id });

      user.notifications = true;

      await this.userRepository.save(user);
    }
  }

  async completeOnboarding(userId: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    user.onboardCompletedAt = new Date();

    return await this.userRepository.save(user);
  }

  async getUsersWithNotifications(
    teamId: string,
    enabled = true
  ): Promise<User[]> {
    const teamUsers = await this.getUsers(teamId);

    return teamUsers.filter((user) => {
      return user.notifications === enabled;
    });
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const stats: UserStatsQuery[] = await this.userRepository.query(
      userStatsQuery(),
      [userId]
    );

    const current = stats[0] || ({} as UserStatsQuery);
    const previous = stats[1] || ({} as UserStatsQuery);

    // Calculate total insights and change
    const totalValue = parseNumber(current.insight_count);
    const totalPrev = parseNumber(previous.insight_count);
    let totalChange = calculateChange(totalValue, totalPrev);

    // Calculate total themes and change
    const themesValue = parseNumber(current.tag_count);
    const themesPrev = parseNumber(previous.tag_count);
    let themesChange = calculateChange(themesValue, themesPrev);

    // Calculate average insights and change
    const averageValue = calculateAverage(stats);
    // Use only the second element onward to approximate "previous" average
    const averageValuePrevious = calculateAverage(stats.slice(1));
    let averageChange = calculateChange(averageValue, averageValuePrevious);

    const streak = parseNumber(current.streak, 0);

    if (stats.length < 2) {
      totalChange = 0.0;
      themesChange = 0.0;
      averageChange = 0.0;
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
      streak: streak.toString(),
    };
  }
}
