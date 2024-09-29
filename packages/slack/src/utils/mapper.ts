import {
  User,
  Profile as UserProfile,
} from "@slack/web-api/dist/types/response/UsersInfoResponse";
import {
  Member,
  Profile as MemberProfile,
} from "@slack/web-api/dist/types/response/UsersListResponse";

export function mapMemberToUser(member: Member): User {
  const user: User = {
    id: member.id,
    team_id: member.team_id,
    name: member.name,
    deleted: member.deleted,
    color: member.color,
    real_name: member.real_name,
    is_admin: member.is_admin,
    is_owner: member.is_owner,
    is_primary_owner: member.is_primary_owner,
    is_restricted: member.is_restricted,
    is_ultra_restricted: member.is_ultra_restricted,
    is_bot: member.is_bot,
    is_app_user: member.is_app_user,
    updated: member.updated,
    tz: member.tz,
    tz_label: member.tz_label,
    tz_offset: member.tz_offset,
    profile: member.profile ? mapProfile(member.profile) : undefined,
    enterprise_user: member.enterprise_user,
    who_can_share_contact_card: member.who_can_share_contact_card,
  };

  return user;
}

function mapProfile(memberProfile: MemberProfile): UserProfile {
  return {
    always_active: memberProfile.always_active,
    api_app_id: memberProfile.api_app_id,
    avatar_hash: memberProfile.avatar_hash,
    bot_id: memberProfile.bot_id,
    display_name: memberProfile.display_name,
    display_name_normalized: memberProfile.display_name_normalized,
    email: memberProfile.email,
    first_name: memberProfile.first_name,
    guest_invited_by: memberProfile.guest_invited_by,
    huddle_state: memberProfile.huddle_state,
    huddle_state_expiration_ts: memberProfile.huddle_state_expiration_ts,
    image_1024: memberProfile.image_1024,
    image_192: memberProfile.image_192,
    image_24: memberProfile.image_24,
    image_32: memberProfile.image_32,
    image_48: memberProfile.image_48,
    image_512: memberProfile.image_512,
    image_72: memberProfile.image_72,
    image_original: memberProfile.image_original,
    is_custom_image: memberProfile.is_custom_image,
    last_name: memberProfile.last_name,
    phone: memberProfile.phone,
    pronouns: memberProfile.pronouns,
    real_name: memberProfile.real_name,
    real_name_normalized: memberProfile.real_name_normalized,
    skype: memberProfile.skype,
    status_emoji: memberProfile.status_emoji,
    status_emoji_display_info: undefined, // Dont need this
    status_emoji_url: undefined, // Dont need this
    status_expiration: memberProfile.status_expiration,
    status_text: memberProfile.status_text,
    status_text_canonical: memberProfile.status_text_canonical,
    team: memberProfile.team,
    title: memberProfile.title,
  };
}
