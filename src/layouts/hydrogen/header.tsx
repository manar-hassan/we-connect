'use client';

import Link from 'next/link';
import HamburgerButton from '@/layouts/hamburger-button';
import SearchWidget from '@/components/search/search';
import Sidebar from '@/layouts/hydrogen/sidebar';
import cn from '@/utils/class-names';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import HeaderMenuRight from '@/layouts/header-menu-right';
import Image from 'next/image';
import logo from '@public/We.png';

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-[60px] items-center bg-gray-0/80 px-4 py-4 shadow-ct-shadow-2 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10'
      )}
    >
      <div className="sticky top-0 z-40 whitespace-nowrap bg-gray-0/10 dark:bg-gray-100/5 2xl:mr-8">
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="text-center text-xl font-bold text-blue-600"
        >
          <Image src={logo} alt="logo" height={60} />
        </Link>
      </div>
      <div className="flex w-[312px] items-center">
        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </header>
  );
}
