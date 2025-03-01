import clsx from 'clsx';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts';
import Link from 'next/link';
import UserAvatar from '../user-avatar/horizontal-avatar';

interface NavContentProps {
  isOpen: boolean;
  close: () => false | void;
}

interface NavItem {
  name: string;
  icon: string;
  href: string;
  description?: string;
  command?: string;
}

export default function NavContent({ isOpen, close }: NavContentProps) {
  const { user } = useAuth();
  return (
    <div
      className={clsx('overflow-y-auto lg:static lg:block', {
        'bg-secondary fixed inset-x-0 bottom-0 top-14 mt-px': isOpen,
        hidden: !isOpen,
      })}
    >
      <nav className="space-y-2 px-2">
        <GlobalNavItem
          item={{
            icon: 'search',
            name: 'Search',
            href: '/editor',
            command: 'K',
          }}
          close={close}
        />

        <div className="space-y-1">
          {navItems.map((item) => (
            <GlobalNavItem key={item.href} item={item} close={close} />
          ))}
        </div>
        <UserAvatar
          name={`${user?.given_name} ${user?.family_name}`}
          email={user?.email!}
        />
      </nav>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: NavItem;
  close: () => false | void;
}) {
  const pathName = usePathname();
  const isActive = item.href === pathName;

  return (
    <Link
      onClick={close}
      href={item.href}
      className={clsx(
        'flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium',
        {
          'hover:bg-secondary': !isActive,
          'bg-secondary': isActive,
        },
      )}
    >
      {navItemIcons[item.icon]}
      {item.name}
      {item.command && (
        <p className="bg-secondary ml-auto rounded px-1 py-0.5">
          &#8984;{item.command}
        </p>
      )}
    </Link>
  );
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    href: '/dashboard',
  },
  {
    name: 'Documents',
    icon: 'documents',
    href: '/dashboard/documents',
  },
  {
    name: 'Settings',
    icon: 'settings',
    href: '/dashboard/settings',
  },
];

export const navItemIcons: { [x: string]: React.ReactNode } = {
  dashboard: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mr-2 h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  settings: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mr-2 h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  ),

  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mr-2 h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  ),

  documents: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mr-2 h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  ),
};
