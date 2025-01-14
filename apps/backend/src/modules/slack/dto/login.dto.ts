import { IsNotEmpty, IsString } from 'class-validator';

export class Login {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
