import { Controller, Get, Param } from "@nestjs/common";
import { Team } from "./team.entity";
import { TeamService } from "./team.service";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(":id")
  find(@Param() params: { id: string }): Promise<Team> {
    return this.teamService.find(params.id);
  }
}
