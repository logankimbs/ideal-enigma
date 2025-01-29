import { IsNotEmpty, IsString } from "class-validator";

export class SlackCallbackDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
