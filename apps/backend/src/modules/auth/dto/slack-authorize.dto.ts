import { IsNotEmpty, IsString } from "class-validator";

export class SlackAuthorizeDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  team_id: string;
}
