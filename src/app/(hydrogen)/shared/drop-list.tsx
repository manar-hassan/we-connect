'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { Placement } from '@floating-ui/react';

function DaysList({
  getValues,
  setValue,
  data,
  object,
  item,
  setItem,
}: {
  getValues: any;
  setValue: any;
  data?: string[] | number[];
  object?: string;
  item?: string;
  setItem?:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <ul className=" max-h-[220px] w-full overflow-auto">
      {data?.map((el) => (
        <li
          key={el}
          onClick={() => {
            //@ts-ignore
            object ? setValue(object, el) : setItem!(el);
          }}
          className={cn(
            'cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1',
            (item ? el === item : el === getValues(object)) &&
              'bg-blue-1 hover:bg-blue-2'
          )}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default function DropList({
  getValues,
  setValue,
  data,
  object,
  buttonClassName,
  panelClassName,
  disabled,
  item,
  setItem,
  buttonName,
  content,
  placement,
}: {
  getValues?: any;
  setValue?: any;
  data?: string[] | number[];
  object?: string;
  buttonClassName?: string;
  panelClassName?: string;
  disabled?: boolean;
  item?: string;
  setItem?: React.Dispatch<React.SetStateAction<string>>;
  buttonName?: string;
  content?: React.ReactNode;
  placement?: Placement;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          {content ? (
            content
          ) : (
            <DaysList
              getValues={getValues}
              setValue={setValue}
              data={data}
              object={object}
              item={item}
              setItem={setItem}
            />
          )}
        </div>
      )}
      shadow="sm"
      placement={placement ? placement : 'bottom-end'}
      className={cn(
        'z-[1000] overflow-hidden rounded-2xl px-2  ',
        panelClassName
      )}
    >
      <button
        disabled={disabled}
        type="button"
        className={cn(
          'peer flex h-10 w-full items-center justify-between rounded-xl border bg-white px-4 capitalize transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2 disabled:opacity-50 disabled:hover:bg-white',
          buttonClassName
        )}
      >
        {buttonName ? buttonName : item ? item : getValues(object)}
        <ArrowDown
          className={cn(
            'transition duration-200',
            isOpen ? '-rotate-180 ' : 'rotate-0'
          )}
        />
      </button>
    </Popover>
  );
}
