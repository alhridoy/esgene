import Link from 'next/link';
import React from 'react';
import { Logo } from '../logo';

export default function Header() {
  return (
    <div className="flex h-14 items-center px-3 py-2 lg:h-auto">
      <Link href="/" className="group flex w-full items-center gap-x-2.5">
        <Logo />
        <h3 className="font-semibold">ESGene</h3>
      </Link>
    </div>
  );
}
