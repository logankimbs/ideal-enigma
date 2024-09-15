import {
  ChatPostMessageResponse,
  ChatScheduleMessageResponse,
  TeamInfoResponse,
  UsersListResponse,
  WebClient,
  KnownBlock,
  Block,
} from "@slack/web-api";
import {
  UsersInfoResponse,
  User as SlackUser,
} from "@slack/web-api/dist/types/response/UsersInfoResponse";
import logger from "../utils/logger";
import { mapMemberToUser } from "../utils/mapper";
import { SlackApiMethod } from "../types";

export class SlackService {
  private webClient: WebClient;

  constructor(webClient: WebClient) {
    this.webClient = webClient;
  }

  public async getUserInfo(userId: string): Promise<SlackUser> {
    const response: UsersInfoResponse = await this.callApi("users.info", {
      user: userId,
    });

    if (!response.ok || !response.user) {
      throw new Error(`Unable to retrieve user information: ${response.error}`);
    }

    return response.user as SlackUser;
  }

  public async getUsersList(teamId: string): Promise<SlackUser[]> {
    const response: UsersListResponse = await this.callApi("users.list", {
      team_id: teamId,
    });

    if (!response.ok || !response.members) {
      throw new Error(`Unable to retrieve user list: ${response.error}`);
    }

    return response.members // Don't return bots
      .filter((member) => !member.is_bot && member.id !== "USLACKBOT")
      .map((member) => mapMemberToUser(member)) as SlackUser[];
  }

  public async getTeamInfo(teamId: string): Promise<TeamInfoResponse["team"]> {
    const response: TeamInfoResponse = await this.callApi("team.info", {
      team: teamId,
    });

    if (!response.ok || !response.team) {
      throw new Error(`Unable to retrieve team information: ${response.error}`);
    }

    return response.team;
  }

  public async postMessage(
    channel: string,
    text: string,
    blocks?: (KnownBlock | Block)[],
  ): Promise<boolean> {
    const response: ChatPostMessageResponse = await this.callApi(
      "chat.postMessage",
      { channel, text, blocks },
    );

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.error}`);
    }

    return response.ok;
  }

  public async scheduleMessage(
    channel: string,
    text: string,
    postAt: number,
    blocks?: (KnownBlock | Block)[],
  ): Promise<boolean> {
    const response: ChatScheduleMessageResponse = await this.callApi(
      "chat.scheduleMessage",
      { channel, text, post_at: postAt, blocks },
    );

    if (!response.ok) {
      throw new Error(`Failed to schedule message: ${response.error}`);
    }

    return response.ok;
  }

  private async callApi(
    method: SlackApiMethod,
    params: Record<string, unknown>,
  ): Promise<any> {
    try {
      const response = await this.webClient.apiCall(method, params);

      if (!response.ok) {
        throw new Error(
          `Slack API error during ${method} with parameters ${JSON.stringify(params)}: ${response.error}`,
        );
      }

      return response;
    } catch (error) {
      logger.error(
        `API call to ${method} with parameters ${JSON.stringify(params)} failed: ${error}`,
      );
      throw error;
    }
  }
}
