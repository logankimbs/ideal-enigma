import { Member } from '@slack/web-api/dist/types/response/UsersListResponse';

export function isMemberBot(member: Member) {
  return member.is_bot || member.id === 'USLACKBOT';
}

export function hasAdminPrivileges(member: Member) {
  return member.is_admin || member.is_owner || member.is_primary_owner;
}
