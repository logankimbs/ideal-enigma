import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user";
import { LoginDto } from "./dto/login.dto";

type AuthPayload = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthPayload> {
    const user = await this.userService.findOne(loginDto.id);

    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
