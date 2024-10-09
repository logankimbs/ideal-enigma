import { SlackUser } from "@idealgma/types";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto extends SlackUser {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  team_id: string;
}

export class CreateUsersListQueryDto {
  @IsNotEmpty()
  @IsString()
  teamId: string;
}

export class CreateUsersListDto {
  @IsNotEmpty()
  @IsArray()
  users: SlackUser[];
}
