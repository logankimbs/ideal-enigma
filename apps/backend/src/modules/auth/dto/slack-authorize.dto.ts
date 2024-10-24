import { IsNotEmpty, IsString } from "class-validator";

export class SlackAuthorizeDto {
  @IsString()
  @IsNotEmpty()
  user: string;
}
