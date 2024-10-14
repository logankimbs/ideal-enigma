import { Public } from "@/src/common/constants";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ValidateTokenDto } from "./dto/validate-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("slack-login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public() // Should this be public?
  @HttpCode(HttpStatus.OK)
  @Post("validate-token")
  validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    return this.authService.validateToken(validateTokenDto);
  }
}
