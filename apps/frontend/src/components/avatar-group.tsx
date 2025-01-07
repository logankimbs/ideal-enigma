import { User } from '@ideal-enigma/common';
import { Avatar } from './avatar';

interface AvatarGroupProps {
  users: User[];
  max?: number;
}

export function AvatarGroup({ users, max = 4 }: AvatarGroupProps) {
  return (
    <div className="flex items-center justify-center -space-x-2">
      {users.slice(0, max).map((user, index) => (
        <Avatar
          key={user.id}
          src={user.data.profile.image_72}
          className={'size-8 ring-2 ring-white dark:ring-zinc-900'}
        />
      ))}
      {users.length > max && (
        <Avatar
          initials={`+${users.length - max}`}
          className={
            'size-8 ring-2 ring-white dark:ring-zinc-900 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400'
          }
        />
      )}
    </div>
  );
}
