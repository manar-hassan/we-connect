'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import SearchIcon from '@/components/icons/search-icon';

const data = [
  {
    id: 0,
    name: 'Africa/Cairo',
  },
  {
    id: 1,
    name: 'Africa/Alexandria',
  },
];

function TimeList({
  setValue,
  getValues,
  setIsOpen,
}: {
  setValue: any;
  getValues: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [text, setText] = useState('');
  const filteredData = () => {
    if (text) {
      return data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }
    return data;
  };

  return (
    <ul className="overflow-hidden">
      <div className="mb-2 flex w-full items-center justify-between border-b py-2 pl-2">
        <input
          type="text"
          className="border-none p-0 text-sm focus:border-none focus:ring-transparent"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <SearchIcon />
      </div>
      {filteredData().map((item) => (
        <li
          key={item.id}
          onClick={() => {
            setValue('general.timeZone', item.name);
            setIsOpen(false);
          }}
          className={cn(
            'w-[200px] cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left transition duration-100 hover:bg-gray-1',
            item.name === getValues('general.timeZone') &&
              'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default function TimeZone({
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
        <div>
          <TimeList
            setValue={setValue}
            getValues={getValues}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] rounded-2xl px-2  "
    >
      <button className="flex h-10 items-center justify-between rounded-full border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2">
        {getValues('general.timeZone')}
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
