'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import cn from '@/utils/class-names';
import ArrowDown from '@/components/icons/arrow-down';

import Link from 'next/link';
import ShadowPerson from '@/components/icons/shadow-person';
import SyncIcon from '@/components/icons/sync';
import ArchiveIcon from '@/components/icons/archive';
import DeleteIcon from '@/components/icons/delete';

const data = [
  {
    id: 0,
    name: 'Edit assignments',
    icon: <ShadowPerson />,
  },
  {
    id: 1,
    name: 'Archive',
    icon: <ArchiveIcon />,
  },
  {
    id: 2,
    name: 'Unsync with shift scheduler',
    icon: <SyncIcon />,
  },
  {
    id: 3,
    name: 'Delete',
    icon: <DeleteIcon />,
  },
];

function MoreList() {
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

export default function More() {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <MoreList />}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-50 rounded-2xl px-2  "
    >
      <button className="flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-blue-5 transition duration-100 hover:bg-gray-1 active:bg-gray-2">
        More
        <ArrowDown
          className={cn(isOpen && '-rotate-180 transition duration-200')}
        />
      </button>
    </Popover>
  );
}
