import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from './user-avatar';
import UserNavContent from './user-nav-content';

interface NavSideBarAvatarProps {
  name: string;
  email: string;
}

export default function NavSideBarAvatar({
  name,
  email,
}: NavSideBarAvatarProps) {
  return (
    <div className="fixed bottom-0 pb-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex w-full items-center text-left">
            <UserAvatar name={name} email={email} />
            <div className="ml-2 text-left">
              <p className="font-md text-sm">{name}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <UserNavContent />
      </DropdownMenu>
    </div>
  );
}
