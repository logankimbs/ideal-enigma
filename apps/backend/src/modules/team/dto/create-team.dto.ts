import { SlackTeam } from "@idealgma/types";
import { IsNotEmpty } from "class-validator";

export class CreateTeamDto extends SlackTeam {
  @IsNotEmpty()
  id: string;
}
