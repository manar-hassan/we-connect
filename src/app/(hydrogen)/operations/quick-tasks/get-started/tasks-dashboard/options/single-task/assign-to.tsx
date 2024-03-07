'use client';

import { Popover } from '@/components/ui/popover';
import React, { useEffect, useRef, useState } from 'react';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import RightIcon from '@/components/icons/right-icon';
import SearchIcon from '@/components/icons/search-icon';
import { Avatar } from 'rizzui';

function AvailableList({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [text, setText] = useState('');
  const filteredData = () => {
    if (text) {
      return data.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }
    return data;
  };

  return (
    <ul className="max-h-[200px] w-full overflow-auto ">
      <div className="mb-1 flex h-8 w-full items-center justify-between rounded-xl border pl-4 pr-2 transition duration-100 focus-within:border-blue-6 hover:border-gray-3">
        <input
          style={{ width: 'inherit' }}
          type="text"
          placeholder="Search"
          className="border-none p-0 text-sm placeholder:text-sm focus:border-none focus:ring-transparent"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <SearchIcon />
      </div>
      {filteredData().map((item: any) => (
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

export default function AssignTo({
  setValue,
  error,
  variable,
  panelClassName,
  buttonClassName,
}: {
  setValue: any;
  error?: boolean;
  variable: string;
  panelClassName?: string;
  buttonClassName?: string;
}) {
  const [data, setData] = useState([
    {
      id: 0,
      name: 'Abdelrahman Saied 1',
      selected: false,
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
      variable,
      data.filter((dataya) => dataya.selected).map((item) => item.name)
    );
  }, [data, setValue]);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div>
          <AvailableList data={data} setData={setData} />
        </div>
      )}
      shadow="sm"
      placement="bottom-end"
      className={cn(
        'z-[1000] w-[341.6px] overflow-hidden  rounded-2xl px-2  ',
        panelClassName
      )}
    >
      <button
        type="button"
        className={cn(
          'flex min-h-[40px] w-full items-center justify-between gap-0.5 rounded-xl border bg-white px-3 py-1 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2',
          error && 'border-red-600',
          buttonClassName
        )}
      >
        <div className="flex flex-wrap gap-1">
          {data.filter((dataya) => dataya.selected).length > 0
            ? data
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
                ))
            : 'Select'}
        </div>
        <ArrowDown
          className={cn(
            'text-gray-6 transition duration-200',
            isOpen ? '-rotate-180 ' : 'rotate-0'
          )}
        />
      </button>
    </Popover>
  );
}
