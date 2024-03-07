'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import cn from '@/utils/class-names';
import ArrowDown from '@/components/icons/arrow-down';
import Video from '@/components/icons/video';
import QuestionMark from '@/components/icons/questions-mark';
import Call from '@/components/icons/call';
import Link from 'next/link';

const data = [
  {
    id: 1,
    name: 'Watch video tutorials',
    icon: <Video />,
  },
  {
    id: 2,
    name: 'Visit help center',
    icon: <QuestionMark />,
  },
  {
    id: 3,
    name: 'Request a phone call',
    icon: <Call />,
  },
];

function HelpList() {
  return (
    <ul className="rounded-full">
      {data.map((item) => (
        <li key={item.id}>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-xl p-2 hover:bg-gray-1"
          >
            {item.icon}
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function HelpDropdown() {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <HelpList />}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-50 rounded-2xl px-2  "
    >
      <div className="flex cursor-pointer items-center gap-2 text-blue-6 hover:text-blue-5 active:text-blue-7">
        Help{' '}
        <ArrowDown
          className={cn(isOpen && '-rotate-180 transition duration-200')}
        />
      </div>
    </Popover>
  );
}
