import { Injectable } from '@nestjs/common';
import {
  Installation,
  InstallationQuery,
  InstallationStore,
} from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import { InstallationService } from '../installation/installation.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';

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
    if (installation.isEnterpriseInstall) {
      throw new Error("We don't support enterprise installations");
    }

    const installationExists = await this.installationService.exists(
      installation.team.id
    );

    if (installationExists) {
      throw new Error('Installation already exists');
    }

    const web = new WebClient(installation.bot.token);
    const { user } = await web.users.info({ user: installation.user.id });

    if (!(user.is_admin || user.is_owner || user.is_primary_owner)) {
      throw new Error('Unauthorized');
    }

    const { team } = await web.team.info({ team: installation.team.id });
    const { members } = await web.users.list({ team_id: team.id });
    const users = members.filter((member) => {
      return !member.is_bot && member.id !== 'USLACKBOT';
    });

    await this.installationService.create(installation);
    const teamEntity = await this.teamService.create(team);
    await this.userService.createBatch(teamEntity, users);

    return Promise.resolve();
  }

  deleteInstallation(query: InstallationQuery<boolean>): Promise<void> {
    console.log('Delete installation query:', query);
    return Promise.resolve();
  }
}
