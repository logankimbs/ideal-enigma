import { Injectable } from '@nestjs/common';
import {
  Installation,
  InstallationQuery,
  InstallationStore,
} from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import {
  EnterpriseInstallError,
  InstallExistsError,
  UnauthorizedInstallError,
} from '../../common/exceptions/install.exceptions';
import {
  hasAdminPrivileges,
  isBotOrDeletedMember,
} from '../../common/utils/slack.utils';
import { InstallationsService } from '../installations/installations.service';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SlackInstallationStore implements InstallationStore {
  constructor(
    private readonly installationService: InstallationsService,
    private readonly teamService: TeamsService,
    private readonly userService: UsersService
  ) {}

  async fetchInstallation(
    query: InstallationQuery<boolean>
  ): Promise<Installation> {
    const installation = await this.installationService.findOne(query.teamId);

    return installation.data as Installation;
  }

  async storeInstallation(installation: Installation) {
    const installationExists = await this.installationService.exists(
      installation.team.id
    );

    if (installationExists) throw new InstallExistsError();
    if (installation.isEnterpriseInstall) throw new EnterpriseInstallError();

    const web = new WebClient(installation.bot.token);
    const installerInfo = await web.users.info({ user: installation.user.id });

    if (!hasAdminPrivileges(installerInfo.user))
      throw new UnauthorizedInstallError();

    const teamInfo = await web.team.info({ team: installation.team.id });
    const usersList = await web.users.list({ team_id: teamInfo.team.id });

    // Filter out all bots and the user that installed the app. This list of
    // users will be onboarded (won't see onboard module on frontend). Only the
    // installer will see the onboarding module.
    const users = usersList.members.filter((member) => {
      return (
        !isBotOrDeletedMember(member) && member.id !== installation.user.id
      );
    });

    await this.installationService.create(installation);

    const team = await this.teamService.create(teamInfo.team);

    await this.userService.onboardUsers(users, team);
    await this.userService.saveInstaller(installerInfo.user, team);

    return Promise.resolve();
  }

  async deleteInstallation(query: InstallationQuery<boolean>): Promise<void> {
    await this.installationService.delete(query.teamId);
  }
}
