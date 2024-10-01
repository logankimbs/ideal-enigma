import { getDatasource, TeamEntity, UserEntity } from "@idealgma/datasource";
import { Member } from "@slack/web-api/dist/types/response/UsersListResponse";

const datasource = getDatasource();
const userRepository = datasource.getRepository(UserEntity);

export class UserService {
  public async saveUser(
    user: Member,
    teamEntity: TeamEntity,
  ): Promise<UserEntity> {
    try {
      this.validateUser(user);
      const userEntity = this.mapToUserEntity(user, teamEntity);

      return await userRepository.save(userEntity);
    } catch (error) {
      console.error(`Failed to save user with ID: ${user?.id}`, error);
      throw new Error(`Failed to save user: ${user?.id}`);
    }
  }

  private validateUser(user: Member): void {
    if (!user?.id) {
      throw new Error("User ID is required but was not provided.");
    }
  }

  private mapToUserEntity(user: Member, teamEntity: TeamEntity): UserEntity {
    return {
      id: user.id,
      team: teamEntity,
      data: user,
    } as UserEntity;
  }
}

export const userService = new UserService();
