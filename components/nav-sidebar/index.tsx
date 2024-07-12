'use client';
import { useState } from 'react';
import Header from './header';
import ToggleMenu from './toggle-menu';
import NavContent from './nav-content';

export function NavSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className=" fixed top-0 z-10 flex w-full flex-col border shadow-sm lg:bottom-0 lg:z-auto lg:w-60">
      <Header />
      <ToggleMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavContent isOpen={isOpen} close={close} />
    </div>
  );
}
