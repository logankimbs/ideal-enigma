import { SummaryData } from '@ideal-enigma/common';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateSummaryDto {
  @IsNotEmpty()
  @IsString()
  teamId: string;

  @IsNotEmpty()
  @IsObject()
  data: SummaryData;

  @IsNotEmpty()
  @IsNumber()
  version: number;
}
