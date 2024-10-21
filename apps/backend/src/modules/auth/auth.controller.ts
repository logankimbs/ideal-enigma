import { Public } from "@/src/common/constants";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Res,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WebClient } from "@slack/web-api";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ValidateTokenDto } from "./dto/validate-token.dto";

const client = new WebClient();

// THIS SHOULD NOT BE PUSHED TO PRODUCTION. THIS IS FOR LOCAL TESTING!!!
// Maybe place these in env then update the config file to use them if node_env === development???
const backend_url =
  "https://1362-2600-8802-450f-bc00-5c61-10f-6dd1-32c6.ngrok-free.app";
const slack_callback_path = "/auth/slack/callback";
const redirect_uri = backend_url + slack_callback_path;
const frontend_url =
  "https://e8c8-2600-8802-450f-bc00-5c61-10f-6dd1-32c6.ngrok-free.app";

@Controller("auth")
export class AuthController {
  client_id: string;
  client_secret: string;
  state_secret: string;
  nonce_secret: string;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    // There definently has to be a better way to use the config file. This is lame.
    this.client_id = this.configService.get<string>("slack.clientId")!;
    this.client_secret = this.configService.get<string>("slack.clientSecret")!;
    this.state_secret = this.configService.get<string>("slack.openId.state")!;
    this.nonce_secret = this.configService.get<string>("slack.openId.nonce")!;
  }

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

  @Get("slack")
  @Redirect("https://slack.com", 302)
  slack() {
    const scope = "openid%20profile%20email"; // Dynamically build from array [openid, profile, email]???
    const team = "T07NG75DFV1"; // Update to be users team thats passed in from body

    return {
      url: `https://slack.com/openid/connect/authorize?response_type=code&scope=${scope}&client_id=${this.client_id}&state=${this.state_secret}&team=${team}&nonce=${this.nonce_secret}&redirect_uri=${redirect_uri}`,
    };
  }

  @Get("slack/callback")
  @Redirect(frontend_url, 302)
  async handleOauthRedirect(@Query("state") state: string, @Res() res: any) {
    console.log("state", state);
    console.log("response", res.req.query.code);

    // validate res.query.code
    const token = await client.openid.connect.token({
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: "authorization_code",
      code: res.req.query.code,
      redirect_uri,
    });

    console.log("token", token);
    let userAccessToken = token.access_token;

    // do refresh logic
    if (token.refresh_token) {
      // token.refresh_token can exist if the token rotation is enabled.
      // The following lines of code demonstrate how to refresh the token.
      // If you don't enable token rotation, you can safely remove this part.
      const refreshedToken = await client.openid.connect.token({
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });

      console.log("refresh_token", JSON.stringify(refreshedToken, null, 2));
      userAccessToken = refreshedToken.access_token;
    }

    // Do some decode stuff

    const tokenWiredClient = new WebClient(userAccessToken);
    const userInfo = await tokenWiredClient.openid.connect.userInfo();

    console.log(userInfo);

    // Redirect user to dashboard with data for frontend
    return { url: frontend_url };
  }
}
