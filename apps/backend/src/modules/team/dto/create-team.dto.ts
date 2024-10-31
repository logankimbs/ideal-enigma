import { SlackTeam } from "@ideal-enigma/common";
import { IsNotEmpty } from "class-validator";

export class CreateTeamDto extends SlackTeam {
  @IsNotEmpty()
  id: string;
}
