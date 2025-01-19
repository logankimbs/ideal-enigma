import { SummaryData } from '@ideal-enigma/common';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateSummaryDto {
  @IsNotEmpty()
  @IsString()
  teamId: string;

  // IMPORTANT!!!
  // SummaryData is a union type of all the summary versions we accept
  @IsNotEmpty()
  @IsObject()
  data: SummaryData;

  @IsNotEmpty()
  @IsNumber()
  version: number;
}
