import { SlackUser } from "@idealgma/common";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto extends SlackUser {
  @IsNotEmpty()
  id: string;
}
