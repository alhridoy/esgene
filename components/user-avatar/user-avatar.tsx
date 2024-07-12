import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  email: string;
  className?: string;
}

export default function UserAvatar({ name, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('h-8 w-8 cursor-pointer', className)}>
      <AvatarImage src={`https://avatar.tobi.sh/${name}`} alt={name} />
      <AvatarFallback className="text-xs">
        {name && name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
