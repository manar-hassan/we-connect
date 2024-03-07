'use client';

import ArrowDown from '@/components/icons/arrow-down';
import GearIcon from '@/components/icons/gear-icon';
import NotificationIcon from '@/components/icons/notification';
import ProfileIcon from '@/components/icons/profile-icon';
import SignOutIcon from '@/components/icons/sing-out';
import { Avatar } from '@/components/ui/avatar';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import OwnerIcon from '@public/owner-icon.webp';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const menuItems = [
  {
    name: "Switch to user's view",
    href: '#',
    icon: <ProfileIcon />,
  },
  {
    name: 'Settings',
    href: routes.forms.profileSettings,
    icon: <GearIcon />,
  },
  {
    name: 'Notifications',
    href: '#',
    icon: <NotificationIcon width="20" height="20" fill="rgb(32 48 64)" />,
  },
  {
    name: 'Sign out',
    href: '#',
    icon: <SignOutIcon />,
  },
];

function DropdownMenu() {
  return (
    <div className="p-2 text-left rtl:text-right">
      <div className="mb-2 flex items-center rounded-[10px] bg-blue-1 p-2 ">
        <div className="relative">
          <Avatar
            src="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
            name="Abdelrahman saied"
            color="invert"
            className="h-8 w-8 rounded-full"
          />
          <div className="absolute -bottom-1 -right-2 h-5 w-5">
            <Image src={OwnerIcon} alt="Owner Icon" />
          </div>
        </div>
        <div className="ms-3 text-sm text-primary">
          <Title as="h6" className="font-bold ">
            Abdelrahman saied
          </Title>
          <Text className="text-gray-600">Owner</Text>
        </div>
      </div>
      <div className="my-2 h-px w-full bg-gray-2"></div>
      <div className="grid font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center justify-start gap-2 rounded-[10px] p-2 text-primary hover:bg-gray-1 focus:outline-none active:bg-gray-2 hover:dark:bg-gray-50/50"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button className="flex shrink-0 items-center rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 ">
        <Avatar
          src="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
          name="Abdelrahman saied"
          color="invert"
        />
        <div className="ms-3 ">
          <Title
            as="h6"
            className="flex items-center gap-2 text-sm font-normal text-blue-6 hover:text-blue-5 active:text-blue-7"
          >
            Abdelrahman saied
            <ArrowDown
              className={cn(isOpen && '-rotate-180 transition duration-200')}
            />
          </Title>
        </div>
      </button>
    </Popover>
  );
}
