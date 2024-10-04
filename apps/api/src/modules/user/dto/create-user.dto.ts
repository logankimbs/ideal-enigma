import { SlackUser } from "@idealgma/common";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto extends SlackUser {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  team_id: string;
}
