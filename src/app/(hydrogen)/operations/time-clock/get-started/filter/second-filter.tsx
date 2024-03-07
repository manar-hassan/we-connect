'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';

const data = [
  'Contains',
  "Doesn't contain",
  'Is',
  'Is not',
  'Starts with',
  'Ends with',
  'Exists',
  'Not exists',
];

const secData = ['Is', 'Is not', 'Exists', 'Not Exists'];

function SecondFilterList({
  item,
  setItem,
  setIsOpen,
  isSecData,
}: {
  item?: string;
  setItem?: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSecData?: boolean;
}) {
  return (
    <ul className="relative grid h-auto max-h-[200px] w-auto min-w-0 grid-cols-1 overflow-y-auto py-1">
      {(secData ? secData : data).map((el) => (
        <li
          key={el}
          onClick={() => {
            setItem!(el);
            setIsOpen(false);
          }}
          className={cn(
            'cursor-pointer truncate whitespace-nowrap px-2 py-1 text-left transition duration-100 hover:bg-gray-1',
            el === item && 'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default function SecondFilter({
  item,
  setItem,
  firstFilter,
  isSecData,
}: {
  item?: string;
  setItem?: React.Dispatch<React.SetStateAction<string>>;
  firstFilter: string;
  isSecData?: boolean;
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <SecondFilterList
          item={item}
          setItem={setItem}
          setIsOpen={setIsOpen}
          isSecData={isSecData}
        />
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className={cn('z-[1000] overflow-hidden p-0  pl-0  ')}
    >
      <button
        disabled={firstFilter === ''}
        type="button"
        className={cn(
          'peer flex h-9 min-w-[120px] items-center justify-between border-b bg-white px-2 transition duration-100  ',

          !firstFilter && 'justify-end'
        )}
      >
        {firstFilter ? item : ''}
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
