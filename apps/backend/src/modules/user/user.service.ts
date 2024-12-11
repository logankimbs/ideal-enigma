import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '@slack/web-api/dist/types/response/UsersListResponse';
import { Repository } from 'typeorm';
import { Team } from '../team/team.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
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

  async createBatch(team: Team, members: Member[]): Promise<User[]> {
    const users = members.map((member) => ({
      id: member.id,
      data: member,
      team,
    }));

    return this.userRepository.save(users);
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.save({
      id: updateUserDto.id,
      data: updateUserDto,
    });
  }
}
