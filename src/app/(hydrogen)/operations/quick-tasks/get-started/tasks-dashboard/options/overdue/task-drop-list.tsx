import { Popover } from '@/components/ui/popover';
import React, { useEffect, useRef, useState } from 'react';
import cn from '@/utils/class-names';
import TriangleInCircle from '@/components/icons/triangle-in-circle';
import ThreeDots from '@/components/icons/three-dots';

function TaskList() {
  return (
    <ul className="w-full">
      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2 py-1 text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        Edit task
      </li>
      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2 py-1  text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        View task details
      </li>
      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2  py-1 text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        Archive task
      </li>

      <li
        className={cn(
          ' mb-1 w-full cursor-pointer rounded-xl px-2  py-1 text-left transition duration-100 hover:bg-gray-1'
        )}
      >
        Delete task
      </li>
    </ul>
  );
}

export default function TaskDropList() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <TaskList />
        </div>
      )}
      shadow="sm"
      placement="bottom-end"
      className={cn('z-[1000] overflow-hidden  rounded-2xl px-2  ')}
    >
      <div className="rotate-90 cursor-pointer">
        <ThreeDots />
      </div>
    </Popover>
  );
}
