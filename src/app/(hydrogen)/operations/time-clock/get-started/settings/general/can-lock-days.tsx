'use client';

import { Popover } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { Avatar } from 'rizzui';
import RightIcon from '@/components/icons/right-icon';

function CanList({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <ul className="max-h-[200px] w-full overflow-auto ">
      {data.map((item: any) => (
        <li
          key={item.id}
          className={cn(
            ' mb-1 w-full cursor-pointer rounded-xl text-left transition duration-100 hover:bg-gray-1',
            item.selected && 'bg-blue-1 hover:bg-blue-2'
          )}
        >
          <label
            htmlFor={item.name}
            className="relative flex w-full cursor-pointer items-center gap-2 p-2 text-primary"
          >
            <input
              onChange={() => {
                setData((prevData: any) => {
                  return prevData.map((prevItem: any) => {
                    if (prevItem.id === item.id) {
                      return { ...prevItem, selected: !prevItem.selected };
                    }
                    return prevItem;
                  });
                });
              }}
              disabled={data.length === 1}
              type="checkbox"
              checked={item.selected}
              id={item.name}
              className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
            />
            <RightIcon inputId={item.name} className="left-[11px]" />
            <Avatar
              src="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
              name="Albert Flores"
              color="invert"
              customSize={21}
            />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function CanDays({
  setValue,
  type,
}: {
  setValue: any;
  type: string;
}) {
  const [data, setData] = useState([
    {
      id: 0,
      name: 'Abdelrahman Saied 1',
      selected: true,
    },
    {
      id: 1,
      name: 'Saied',
      selected: false,
    },
    {
      id: 2,
      name: 'Abdelrahman Saied 3',
      selected: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setValue(
      type === 'lock' ? 'general.canLockDays' : 'general.canUnlockDays',
      data.filter((dataya) => dataya.selected).map((item) => item.name)
    );
  }, [data, setValue, type]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div>
          <CanList data={data} setData={setData} />
        </div>
      )}
      shadow="sm"
      placement="bottom-end"
      className="z-[1000] w-[290px]  rounded-2xl px-2  "
    >
      <button className="flex min-h-[40px] items-center justify-between gap-0.5 rounded-lg border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2">
        <div className="flex flex-wrap gap-1">
          {data
            .filter((dataya) => dataya.selected)
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1 whitespace-nowrap rounded-md bg-gray-1 px-1 text-[12px] "
              >
                <Avatar
                  src="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
                  name="Albert Flores"
                  color="invert"
                  customSize={16}
                />
                {item.name}
              </div>
            ))}
        </div>
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
