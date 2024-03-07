'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { capitalize } from 'lodash';

const data = [
  {
    id: 0,
    name: 'All activity',
  },
  {
    id: 1,
    name: 'Clocked in',
  },
  {
    id: 2,
    name: 'Clocked out',
  },
];

function ActivityList({
  activeButton,
  setActiveButton,
}: {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <ul className="rounded-full">
      {data.map((item) => (
        <li
          key={item.id}
          onClick={() => setActiveButton(item.name)}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-xl p-2 transition duration-100 hover:bg-gray-1',
            item.name === activeButton && 'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {capitalize(item.name)}
        </li>
      ))}
    </ul>
  );
}

export default function AllActivity({
  activeButton,
  setActiveButton,
}: {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <ActivityList
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      )}
      shadow="sm"
      placement="bottom-start"
      className="z-50 rounded-2xl px-2  "
      showArrow={false}
    >
      <button className="flex h-10 items-center justify-between rounded-full border bg-white px-4 transition duration-100 hover:bg-gray-1 active:bg-gray-2">
        {capitalize(activeButton)}
        <ArrowDown
          className={cn(
            'text-gray-6',
            isOpen && '-rotate-180 transition duration-200'
          )}
        />
      </button>
    </Popover>
  );
}
