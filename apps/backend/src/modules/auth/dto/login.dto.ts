import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSlackUser {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
