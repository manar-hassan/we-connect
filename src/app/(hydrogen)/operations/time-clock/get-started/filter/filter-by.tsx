'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';

const data = [
  {
    head: 'User details',
    list: [
      'First name',
      'Last name',
      'Email',
      'Group',
      'User tags',
      'User type',
      'Date added',
    ],
  },
  {
    head: 'Feature usage',
    list: ['I confirm my hours', 'Image from route', 'Job', 'Sub-jobs', 'Paid'],
  },
  {
    head: 'Advanced user info',
    list: [
      'Total number of sessions',
      'Days in the system',
      'Last logged-in',
      'Mobile device',
      'OS version',
      'App version',
    ],
  },
  {
    head: 'Custom fields',
    list: [
      'Employment Start Date',
      'Team',
      'Department',
      'Branch',
      'Direct manager',
      'Birthday',
    ],
  },
];

function FilterList({
  item,
  setItem,
  setIsOpen,
  filteredText,
}: {
  item?: string;
  setItem?: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredText: string;
}) {
  const filteredData = () => {
    return data;
  };

  return (
    <ul className="relative grid h-auto max-h-[200px] w-auto min-w-0 grid-cols-3 overflow-y-scroll">
      {filteredData().map((el) => (
        <li key={el.head} className={cn(' border-r text-primary ')}>
          <div className="sticky top-0 flex h-9 items-center justify-start bg-[#f6f9fc] pl-2 text-[13px] text-[#535b5dcc]">
            {el.head}
          </div>
          {el.list.map((li) => (
            <div
              key={li}
              onClick={() => {
                setItem!(li);
                setIsOpen(false);
              }}
              className={cn(
                'cursor-pointer truncate whitespace-nowrap px-2 py-1 text-left transition duration-100 hover:bg-gray-1',
                li === item && 'bg-blue-1 hover:bg-blue-2'
              )}
            >
              {li}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}

export default function FilterBy({
  item,
  setItem,
}: {
  item?: string;
  setItem?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredText, setFilteredText] = useState('');

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <FilterList
          item={item}
          setItem={setItem}
          setIsOpen={setIsOpen}
          filteredText={filteredText}
        />
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className={cn('z-[1000] overflow-hidden p-0 pl-2  ')}
    >
      {isOpen ? (
        <input
          style={{
            borderBottom: '1px solid #e1e1e1',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
          type="text"
          className="input-null h-10 w-[120px] border-b"
          placeholder="Select..."
          onChange={(e) => setFilteredText(e.target.value)}
        />
      ) : (
        <button
          type="button"
          className={cn(
            'peer flex h-9 min-w-[120px] items-center justify-between border-b bg-white px-2 transition duration-100  '
          )}
        >
          {item || 'Select...'}
          <ArrowDown
            className={cn(
              'text-gray-6',
              isOpen && '-rotate-180 transition duration-200'
            )}
          />
        </button>
      )}
    </Popover>
  );
}
