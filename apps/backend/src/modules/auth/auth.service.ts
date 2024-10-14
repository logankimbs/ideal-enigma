import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user";
import { LoginDto } from "./dto/login.dto";
import { ValidateTokenDto } from "./dto/validate-token.dto";

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

  async validateToken(validateTokenDto: ValidateTokenDto) {
    try {
      const payload = this.jwtService.verify(validateTokenDto.token);
      const user = await this.userService.findOne(payload.sub);

      if (!user) throw new UnauthorizedException("User not found");

      // Generate a new token for the session
      const authToken = this.jwtService.sign(
        { sub: user.id, email: user.data.profile.email },
        { expiresIn: "1h" },
      );

      return { authToken };
    } catch (error: unknown) {
      console.log("Error:", error);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
