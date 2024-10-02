import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  team_id: string;
}
