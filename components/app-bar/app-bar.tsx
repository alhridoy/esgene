'use client';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import UserAvatar from '@/components/user-avatar/vertical-avatar';
import { useAuth } from '@/contexts';

const AppBar = () => {
  const { user } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center border-b border-solid p-4 ">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/dashboard"
          className="group flex w-full items-center gap-x-2.5"
        >
          <Logo />
          <h3 className="font-semibold tracking-wide">ESGene</h3>
        </Link>
      </nav>
      <div className="ml-auto">
        <UserAvatar
          name={`${user?.given_name} ${user?.family_name}`}
          email={user?.email!}
        />
      </div>
    </header>
  );
};

export default AppBar;
