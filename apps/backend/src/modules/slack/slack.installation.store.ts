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
} from '../../common/errors';
import { InstallationService } from '../installation/installation.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { hasAdminPrivileges, isMemberBot } from './slack.utils';

@Injectable()
export class SlackInstallationStore implements InstallationStore {
  constructor(
    private readonly installationService: InstallationService,
    private readonly teamService: TeamService,
    private readonly userService: UserService
  ) {}

  fetchInstallation(query: InstallationQuery<boolean>): Promise<Installation> {
    console.log('Fetch installation query:', query);
    return Promise.resolve({} as Installation);
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
      return !isMemberBot(member) && member.id !== installation.user.id;
    });

    await this.installationService.create(installation);

    const team = await this.teamService.create(teamInfo.team);

    await this.userService.onboardUsers(users, team);
    await this.userService.saveInstaller(installerInfo.user, team);

    return Promise.resolve();
  }

  deleteInstallation(query: InstallationQuery<boolean>): Promise<void> {
    console.log('Delete installation query:', query);
    return Promise.resolve();
  }
}
