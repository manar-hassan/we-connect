'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { Tooltip } from 'rizzui';

const data = [
  {
    id: 0,
    name: 'Disabled',
  },
  {
    id: 1,
    name: 'For qualified admins',
  },
  {
    id: 2,
    name: 'For qualified admins and users',
    tooltip: true,
  },
];

function ShowList({ setValue, getValues }: { setValue: any; getValues: any }) {
  return (
    <ul className=" overflow-hidden">
      {data.map((item) => (
        <li
          key={item.id}
          onClick={() => setValue('general.showPayRate', item.name)}
          className={cn(
            'w-[200px] cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left transition duration-100 hover:bg-gray-1',
            item.name === getValues('general.showPayRate') &&
              'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {item.tooltip ? (
            <Tooltip
              placement="top"
              className="relative z-[1000] bg-gray-10 text-sm"
              showArrow={false}
              content={() => 'For qualified admins and users'}
            >
              <span>{item.name}</span>
            </Tooltip>
          ) : (
            item.name
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ShowPayRates({
  setValue,
  getValues,
}: {
  setValue: any;
  getValues: any;
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <ShowList setValue={setValue} getValues={getValues} />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] rounded-2xl px-2  "
    >
      <button className="flex h-10 items-center justify-between rounded-full border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2">
        {getValues('general.showPayRate')}
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
