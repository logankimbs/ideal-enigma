import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTeamDto } from "./dto/create-team.dto";
import { Team } from "./team.entity";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new Team();
    team.id = createTeamDto.id;
    team.data = createTeamDto;

    return this.teamRepository.save(team);
  }

  findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async find(id: string): Promise<Team> {
    return await this.teamRepository.findOneOrFail({
      where: { id },
      relations: ["users"],
    });
  }
}
