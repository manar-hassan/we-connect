'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { useWatch } from 'react-hook-form';

const data = [
  {
    id: 0,
    type: 'Paid',
  },
  {
    id: 1,
    type: 'Unpaid',
  },
];

function TypeList({
  item,
  setManualCount,
  index,
}: {
  item: any;
  setManualCount: any;
  index: number;
}) {
  const handleOnClick = (type: string) => {
    setManualCount((prevManualCount: any) => {
      const updatedManualCount = [...prevManualCount];
      updatedManualCount[index].type = type;
      return updatedManualCount;
    });
  };

  return (
    <ul className=" overflow-hidden">
      {data.map((el) => (
        <li
          key={el.id}
          //@ts-ignore
          onClick={(e) => handleOnClick(e.target.textContent)}
          className={cn(
            ' cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left transition duration-100 hover:bg-gray-1',
            el.type === item.type && 'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {el.type}
        </li>
      ))}
    </ul>
  );
}

export default function Type({
  item,
  setManualCount,
  index,
  control,
}: {
  item: any;
  setManualCount: any;
  index: number;
  control: any;
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  const Watch = (name: any) =>
    useWatch({
      control,
      name,
    });

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <TypeList item={item} setManualCount={setManualCount} index={index} />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] w-[98px] overflow-hidden rounded-2xl px-2  "
    >
      <button
        disabled={Watch('breaks.chosen') != 'manual'}
        className="peer flex h-10 w-[98px] items-center justify-between rounded-xl border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        {item.type}
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
