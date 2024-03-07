'use client';

import { Popover } from '@/components/ui/popover';
import React, { useEffect, useRef, useState } from 'react';
import cn from '@/utils/class-names';
import TriangleInCircle from '@/components/icons/triangle-in-circle';

function DayList() {
  return (
    <ul className="w-full">
      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2 py-1 text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        Send reminder for tasks in date
      </li>
      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2 py-1  text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        Archive tasks in date
      </li>
      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2  py-1 text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        Delete tasks in date
      </li>
    </ul>
  );
}

export default function DayDropList() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <DayList />
        </div>
      )}
      shadow="sm"
      placement="bottom-start"
      className={cn('z-[1000] overflow-hidden  rounded-2xl px-2  ')}
    >
      <div className="cursor-pointer">
        <TriangleInCircle
          className={cn(
            'text-gray-6 transition duration-200',
            isOpen ? '-rotate-180 ' : 'rotate-0'
          )}
        />
      </div>
    </Popover>
  );
}
