'use client';
import React from 'react';

const PageHeader = ({
  children,
  pageName,
}: {
  children: React.ReactElement;
  pageName: string;
}) => {
  return (
    // TODO: Make the header responsive for mobile
    <header className="fixed left-[240px] right-0 top-0 z-10 flex h-12 items-center border-b border-solid p-5">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <div className="group flex w-full items-center gap-x-2.5">
          <h4 className="text-sm font-semibold tracking-wide">{pageName}</h4>
        </div>
      </nav>
      <div className="ml-auto">{children}</div>
    </header>
  );
};

export default PageHeader;
