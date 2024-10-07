import { SlackUser } from "@idealgma/types";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto extends SlackUser {
  @IsNotEmpty()
  id: string;
}
