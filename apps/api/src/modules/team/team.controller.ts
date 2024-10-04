import { Controller, Get } from "@nestjs/common";
import { TeamService } from "./team.service";
import { Team } from "./team.entity";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }
}