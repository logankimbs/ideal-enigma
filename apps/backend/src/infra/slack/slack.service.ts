import { SummaryTextV3 } from '@ideal-enigma/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, ModuleRef } from '@nestjs/core';
import { App, ExpressReceiver } from '@slack/bolt';
import { CodedError, Installation, InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  EnterpriseInstallError,
  UnauthorizedInstallError,
} from '../../common/exceptions/install.exceptions';
import getNextOccurrence from '../../common/utils/date.utils';
import { InstallationsService } from '../../modules/installations/installations.service';
import { TeamsService } from '../../modules/teams/teams.service';
import { User } from '../database/entities/user.entity';
import {
  actionRegistry,
  eventRegistry,
  viewRegistry,
} from './listeners/listeners.registry';
import { InstallationStore } from './stores/installation.store';
import fridayReminderMessage from './surfaces/messages/friday-reminder.message';
import mondayReminderMessage from './surfaces/messages/monday-reminder.message';
import summaryMessage from './surfaces/messages/summary.message';
import welcomeMessage from './surfaces/messages/welcome.message';

@Injectable()
export class SlackService implements OnModuleInit {
  private logger = new Logger(SlackService.name);

  private readonly app: App;
  private readonly expressReceiver: ExpressReceiver;
  private readonly installer: InstallProvider;

  constructor(
    private readonly slackInstallationStore: InstallationStore,
    private readonly teamService: TeamsService,
    private readonly installationService: InstallationsService,
    private readonly configService: ConfigService,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly moduleRef: ModuleRef
  ) {
    this.expressReceiver = new ExpressReceiver({
      signingSecret: this.configService.get<string>('slack.signingSecret'),
      clientId: this.configService.get<string>('slack.clientId'),
      clientSecret: this.configService.get<string>('slack.clientSecret'),
      stateSecret: this.configService.get<string>('slack.state'),
      scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
      endpoints: { events: '/slack/events', actions: '/slack/actions' },
      installationStore: this.slackInstallationStore,
      redirectUri: `${this.configService.get<string>(
        'backendUrl'
      )}/slack/install/callback`,
      installerOptions: {
        directInstall: true,
        userScopes: ['openid', 'profile', 'email'],
        redirectUriPath: '/slack/install/callback',
      },
    });

    this.app = new App({
      receiver: this.expressReceiver,
    });

    // Todo: get rid of installer and use slack bolt oauth instead
    this.installer = new InstallProvider({
      clientId: this.configService.get<string>('slack.clientId'),
      clientSecret: this.configService.get<string>('slack.clientSecret'),
      stateSecret: this.configService.get<string>('slack.state'),
      directInstall: true,
      installationStore: this.slackInstallationStore,
      installUrlOptions: {
        scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
        userScopes: ['openid', 'profile', 'email'],
        redirectUri: `${this.configService.get<string>(
          'backendUrl'
        )}/slack/install/callback`,
      },
    });
  }

  async onModuleInit() {
    this.registerListeners();

    const httpAdapter = this.httpAdapterHost?.httpAdapter;
    if (!httpAdapter) {
      console.info('HTTP adapter not available. Skipping initialization.');
      return;
    }

    const expressInstance = httpAdapter.getInstance();
    expressInstance.use(this.expressReceiver.router);
  }

  async handleInstall(req: IncomingMessage, res: ServerResponse) {
    return await this.installer.handleInstallPath(req, res);
  }

  async handleInstallRedirect(req: IncomingMessage, res: ServerResponse) {
    let url: string | undefined;

    const onSuccess = async (installation: Installation) => {
      this.logger.log('Installation successful');

      url = `${this.configService.get<string>('backendUrl')}/auth/slack?user=${
        installation.user.id
      }`;
    };

    const onFailure = (error: CodedError) => {
      const baseUrl = this.configService.get<string>('frontendUrl') || '';
      let path = '/slack/install/error';

      if (error.message.includes('cancelled the OAuth')) {
        return (url = baseUrl);
      }

      if (error instanceof UnauthorizedInstallError) {
        path += '/unauthorized';
      } else if (error instanceof EnterpriseInstallError) {
        path += '/unsupported-plan';
      }

      url = `${baseUrl}${path}`;
    };

    await this.installer.handleCallback(req, res, {
      success: onSuccess,
      failure: onFailure,
    });

    return { url };
  }

  async sendWelcomeMessageToTeam(teamId: string) {
    const team = await this.teamService.find(teamId);
    const users = team.users.filter((user) => {
      return user.notifications === true;
    });

    const installation = await this.installationService.findOne(team.id);
    const client = new WebClient(installation.token);

    await Promise.all(
      users.map((user) => client.chat.postMessage(welcomeMessage(user.id)))
    );
  }

  async sendSummaryMessage(
    token: string,
    users: User[],
    summary: SummaryTextV3
  ) {
    const client = new WebClient(token);
    const message = summaryMessage(summary);

    for (const user of users) {
      if (user.data.deleted) {
        this.logger.warn(
          `Can't send summary to user ${user.id} who has been deleted from slack`
        );
        continue;
      }

      const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

      this.logger.log(`Scheduling summary message to be sent to ${user.id}`);
      await client.chat.scheduleMessage({
        channel: user.id,
        text: message.text,
        blocks: message.blocks,
        post_at: timestamp,
      });
    }
  }

  async sendReminderMessage(
    token: string,
    users: User[],
    day: 'monday' | 'friday'
  ) {
    const client = new WebClient(token);
    const message =
      day === 'friday' ? fridayReminderMessage() : mondayReminderMessage();

    for (const user of users) {
      if (user.data.deleted) {
        this.logger.warn(
          `Can't send reminder to user ${user.id} who has been deleted from slack`
        );
        continue;
      }

      const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

      this.logger.log(`Scheduling reminder message to be sent to ${user.id}`);
      await client.chat.scheduleMessage({
        channel: user.id,
        text: message.text,
        blocks: message.blocks,
        post_at: timestamp,
      });
    }
  }

  private registerListeners() {
    actionRegistry.forEach(({ name, token }) => {
      const handlerInstance = this.moduleRef.get(token, { strict: false });
      this.app.action(name, handlerInstance.handle.bind(handlerInstance));
    });

    eventRegistry.forEach(({ name, token }) => {
      const handlerInstance = this.moduleRef.get(token, { strict: false });
      this.app.event(name, handlerInstance.handle.bind(handlerInstance));
    });

    viewRegistry.forEach(({ name, token }) => {
      const handlerInstance = this.moduleRef.get(token, { strict: false });
      this.app.view(name, handlerInstance.handle.bind(handlerInstance));
    });
  }
}
