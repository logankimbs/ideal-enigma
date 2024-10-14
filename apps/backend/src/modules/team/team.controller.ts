import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTeamDto } from "./dto/create-team.dto";
import { Team } from "./team.entity";
import { TeamService } from "./team.service";

@Controller("teams")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(":id")
  find(@Param() params: { id: string }): Promise<Team> {
    return this.teamService.find(params.id);
  }
}
