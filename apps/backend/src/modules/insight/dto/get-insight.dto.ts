import { IsNotEmpty, IsString } from 'class-validator';

export class GetInsightByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
