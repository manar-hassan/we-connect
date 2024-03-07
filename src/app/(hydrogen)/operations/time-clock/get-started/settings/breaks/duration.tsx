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
    time: '5 minutes',
  },
  {
    id: 1,
    time: '10 minutes',
  },
  {
    id: 2,
    time: '15 minutes',
  },
  {
    id: 3,
    time: '20 minutes',
  },
  {
    id: 4,
    time: '25 minutes',
  },
  {
    id: 5,
    time: '30 minutes',
  },
  {
    id: 6,
    time: '35 minutes',
  },
  {
    id: 7,
    time: '40 minutes',
  },
  {
    id: 8,
    time: '45 minutes',
  },
  {
    id: 9,
    time: '50 minutes',
  },
  {
    id: 10,
    time: '55 minutes',
  },
  {
    id: 11,
    time: '1 hour',
  },
  {
    id: 12,
    time: '1.5 hours',
  },
  {
    id: 13,
    time: '2 hours',
  },
];

function DurationList({
  item,
  setManualCount,
  index,
  auto,
  getValues,
  setValue,
}: {
  index: number;
  item: any;
  setManualCount?: any;
  auto?: boolean;
  getValues?: any;
  setValue?: any;
}) {
  const handleOnClick = (duration: string) => {
    setManualCount((prevManualCount: any) => {
      const updatedManualCount = [...prevManualCount];
      updatedManualCount[index].duration = duration;
      return updatedManualCount;
    });
  };
  return (
    <ul className="w-full overflow-hidden">
      {data.map((el) => (
        <li
          key={el.id}
          onClick={(e) => {
            auto
              ? setValue(
                  `breaks.automatic[${index}].duration`,
                  (e.target as HTMLElement).textContent
                )
              : //@ts-ignore
                handleOnClick(e.target.textContent);
          }}
          className={cn(
            'cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left transition duration-100 hover:bg-gray-1',
            el.time === getValues(`breaks.automatic[${index}].duration`) &&
              'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {el.time}
        </li>
      ))}
    </ul>
  );
}

export default function Duration({
  item,
  setManualCount,
  index,
  auto,
  getValues,
  setValue,
  control,
}: {
  item: any;
  setManualCount?: any;
  index: number;
  auto?: boolean;
  getValues?: any;
  setValue?: any;
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
          <DurationList
            index={index}
            item={item}
            setManualCount={setManualCount}
            auto={auto}
            getValues={getValues}
            setValue={setValue}
          />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] h-[160px] overflow-auto rounded-2xl px-2  "
    >
      <button
        disabled={
          auto
            ? Watch('breaks.chosen') != 'automatic'
            : Watch('breaks.chosen') != 'manual'
        }
        className="flex h-10 w-[123px] items-center justify-between whitespace-nowrap rounded-xl border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        {auto
          ? getValues(`breaks.automatic[${index}].duration`)
          : item.duration}
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
