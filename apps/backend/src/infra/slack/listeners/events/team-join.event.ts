import { SlackUser } from '@ideal-enigma/common';
import { Injectable, Logger } from '@nestjs/common';
import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { UsersService } from '../../../../modules/users/users.service';

@Injectable()
export class TeamJoinEvent {
  private logger = new Logger(TeamJoinEvent.name);

  constructor(private readonly userService: UsersService) {}

  async handle({
    event,
  }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'team_join'>) {
    try {
      if (event.user.is_bot) return;

      await this.userService.create({
        ...(event.user as SlackUser),
      });

      // Todo: send enable notifications welcome message
    } catch (error) {
      this.logger.error(`Error adding user ${event.user.id}:`, error);
    }
  }
}
