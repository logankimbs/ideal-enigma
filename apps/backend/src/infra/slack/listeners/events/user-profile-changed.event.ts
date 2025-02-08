import { SlackUser } from '@ideal-enigma/common';
import { Injectable, Logger } from '@nestjs/common';
import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { UsersService } from '../../../../modules/users/users.service';

@Injectable()
export class UserProfileChangedEvent {
  private logger = new Logger(UserProfileChangedEvent.name);

  constructor(private readonly userService: UsersService) {}

  async handle({
    event,
    client,
  }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'user_profile_changed'>) {
    try {
      // I know this seems weird, but the user the event gives us does not
      // match the user object we store in the users table
      const { user } = await client.users.info({ user: event.user.id });

      await this.userService.update({ ...(user as SlackUser) });
    } catch (error) {
      this.logger.error(`Error updating user ${event.user.id}:`, error);
    }
  }
}
