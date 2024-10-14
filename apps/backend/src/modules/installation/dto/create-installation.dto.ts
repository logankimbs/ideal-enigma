import { Installation as SlackInstallation } from "@slack/bolt";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateInstallationDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsObject()
  installation: SlackInstallation;

  @IsNotEmpty()
  @IsString()
  token: string;
}
