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
    name: 'Additional',
    type: '+ base wage',
  },
  {
    id: 1,
    name: 'Multiplier',
    type: 'X base wage',
  },
];

function BaseWageList({ getValues, setValue, object }: any) {
  return (
    <ul className=" overflow-hidden">
      {data.map((el) => (
        <li
          key={el.id}
          onClick={(e) => {
            //@ts-ignore
            setValue(`overtime.${object}.baseWage.type`, e.target.textContent);
          }}
          className={cn(
            ' cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left transition duration-100 hover:bg-gray-1',
            el.type === getValues(`overtime.${object}.baseWage.type`) &&
              'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {el.type}
        </li>
      ))}
    </ul>
  );
}

export default function BaseWage({
  getValues,
  setValue,
  control,
  object,
  watch,
}: any) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  const Watch = useWatch({
    control: control,
    name: watch ? watch : `overtime.${object}.isChecked`,
  });

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <BaseWageList
            getValues={getValues}
            setValue={setValue}
            object={object}
          />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000]  overflow-hidden rounded-2xl px-2  "
    >
      <button
        disabled={!Watch}
        type="button"
        className="peer flex h-10  items-center justify-between rounded-xl border border-none bg-transparent px-4 transition duration-100"
      >
        {getValues(`overtime.${object}.baseWage.type`)}
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
