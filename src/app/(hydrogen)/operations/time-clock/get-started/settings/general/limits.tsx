'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { useWatch } from 'react-hook-form';

const hours = [
  { id: 0, hours: '2 Hours' },
  { id: 1, hours: '02:30 Hours' },
  { id: 2, hours: '3 Hours' },
  { id: 3, hours: '03:30 Hours' },
  { id: 4, hours: '4 Hours' },
  { id: 5, hours: '04:30 Hours' },
  { id: 6, hours: '5 Hours' },
  { id: 7, hours: '05:30 Hours' },
  { id: 8, hours: '6 Hours' },
  { id: 9, hours: '06:30 Hours' },
  { id: 10, hours: '7 Hours' },
  { id: 11, hours: '07:30 Hours' },
  { id: 12, hours: '8 Hours' },
  { id: 13, hours: '08:30 Hours' },
  { id: 14, hours: '9 Hours' },
  { id: 15, hours: '09:30 Hours' },
  { id: 16, hours: '10 Hours' },
  { id: 17, hours: '10:30 Hours' },
  { id: 18, hours: '11 Hours' },
  { id: 19, hours: '11:30 Hours' },
  { id: 20, hours: '12 Hours' },
  { id: 21, hours: '12:30 Hours' },
  { id: 22, hours: '13 Hours' },
  { id: 23, hours: '13:30 Hours' },
  { id: 24, hours: '14 Hours' },
  { id: 25, hours: '14:30 Hours' },
  { id: 26, hours: '15 Hours' },
  { id: 27, hours: '15:30 Hours' },
  { id: 28, hours: '16 Hours' },
  { id: 29, hours: '16:30 Hours' },
  { id: 30, hours: '17 Hours' },
  { id: 31, hours: '17:30 Hours' },
  { id: 32, hours: '18 Hours' },
  { id: 33, hours: '18:30 Hours' },
  { id: 34, hours: '19 Hours' },
  { id: 35, hours: '19:30 Hours' },
  { id: 36, hours: '20 Hours' },
  { id: 37, hours: '20:30 Hours' },
  { id: 38, hours: '21 Hours' },
  { id: 39, hours: '21:30 Hours' },
  { id: 40, hours: '22 Hours' },
  { id: 41, hours: '22:30 Hours' },
  { id: 42, hours: '23 Hours' },
  { id: 43, hours: '23:30 Hours' },
];

function ActivityList({
  setValue,
  value,
  object,
  auto,
  index,
  getValues,
}: {
  setValue: any;
  value?: any;
  object: string;
  auto?: boolean;
  index?: number;
  getValues?: any;
}) {
  return (
    <ul className="rounded-full">
      {hours.map((item) => (
        <li
          key={item.id}
          onClick={(e) =>
            auto
              ? setValue(
                  `breaks.automatic[${index}].hours`,
                  (e.target as HTMLElement).textContent
                )
              : setValue(
                  `${object}.hours`,
                  (e.target as HTMLElement).textContent
                )
          }
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-xl p-2 transition duration-100 hover:bg-gray-1',
            item.hours === value?.hours && 'bg-blue-1 hover:bg-blue-2',
            item.hours === getValues(`breaks.automatic[${index}].hours`) &&
              'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {item.hours}
        </li>
      ))}
    </ul>
  );
}

export default function Limits({
  value,
  setValue,
  object,
  control,
  getValues,
  auto,
  index,
}: {
  value?: any;
  setValue: any;
  object: string;
  control: any;
  getValues: any;
  auto?: boolean;
  index?: number;
}) {
  const Watch = (name: any) =>
    useWatch({
      control,
      name,
    });

  const watchGeneral = Watch(`${object}.isChecked`);
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <ActivityList
            setValue={setValue}
            value={value}
            object={object}
            index={index}
            getValues={getValues}
            auto={auto}
          />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] h-40 overflow-y-auto rounded-2xl px-2  "
    >
      <button
        disabled={auto ? Watch('breaks.chosen') != 'automatic' : !watchGeneral}
        className={cn(
          'flex items-center justify-between rounded-full border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2 disabled:cursor-not-allowed disabled:text-gray-4 disabled:hover:bg-white',
          auto && 'h-full rounded-xl'
        )}
      >
        {auto
          ? getValues(`breaks.automatic[${index}].hours`)
          : getValues(`${object}.hours`)}
        <ArrowDown
          className={cn(
            'text-gray-6',
            isOpen && '-rotate-180 transition duration-200',
            !watchGeneral && 'text-gray-4'
          )}
        />
      </button>
    </Popover>
  );
}
