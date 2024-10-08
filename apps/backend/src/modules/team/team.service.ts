import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Team } from "./team.entity";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

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
