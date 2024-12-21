import { SlackUser } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as Installer } from '@slack/web-api/dist/types/response/UsersInfoResponse';
import { Member } from '@slack/web-api/dist/types/response/UsersListResponse';
import { Repository } from 'typeorm';
import { InsightService } from '../insight/insight.service';
import { TagService } from '../tag/tag.service';
import { Team } from '../team/team.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    private readonly tagService: TagService,
    private readonly insightService: InsightService
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const team = await this.teamRepository.findOneOrFail({
      where: { id: createUserDto.team_id },
    });

    const user = new User();
    user.id = createUserDto.id;
    user.data = createUserDto;
    user.team = team;

    return this.userRepository.save(user);
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

  async getUserWeeklyTagCountAndChange(userId: string) {
    return await this.tagService.getUserWeeklyTagCountAndChange(userId);
  }

  async getTeamWeeklyTagCountAndChange(teamId: string) {
    return await this.tagService.getTeamWeeklyTagCountAndChange(teamId);
  }

  async getUserInsightStreak(userId: string) {
    await this.findOne(userId);
    return await this.insightService.getUserStreak(userId);
  }
}
