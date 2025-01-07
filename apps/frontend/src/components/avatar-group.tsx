import { User } from '@ideal-enigma/common';
import React from 'react';
import { Avatar } from './avatar';

interface AvatarGroupProps {
  users: User[];
  max?: number;
  avatarClassName?: string; // Optional class for individual avatar styling
  containerClassName?: string; // Optional class for container styling
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, max = 4 }) => {
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
};

export default AvatarGroup;
