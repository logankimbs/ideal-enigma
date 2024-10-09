import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInsightDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  link?: string;
}
