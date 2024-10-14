import { SlackTeam } from "@idealgma/common";
import { IsNotEmpty } from "class-validator";

export class CreateTeamDto extends SlackTeam {
  @IsNotEmpty()
  id: string;
}
