import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserNavContent from './user-nav-content';
import UserAvatar from './user-avatar';

interface NavSideBarAvatarProps {
  name: string;
  email: string;
}

export default function AppBarUserAvatar({
  name,
  email,
}: NavSideBarAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={name} email={email} />
      </DropdownMenuTrigger>
      <UserNavContent />
    </DropdownMenu>
  );
}
