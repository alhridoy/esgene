'use client';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export const LandingPageAppBar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center p-4">
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
        <div className="flex justify-between gap-5">
          <Link href="/login" className="py-2">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-primary rounded-full px-4 py-2 text-white"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};
