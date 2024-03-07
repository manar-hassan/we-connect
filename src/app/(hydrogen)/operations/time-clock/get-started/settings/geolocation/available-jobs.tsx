'use client';

import { Popover } from '@/components/ui/popover';
import React, { useEffect, useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import RightIcon from '@/components/icons/right-icon';
import SearchIcon from '@/components/icons/search-icon';

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
      <div className="flex h-8 w-full items-center justify-between rounded-xl border pl-4 pr-2 transition duration-100 focus-within:border-blue-6 hover:border-gray-3">
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
            ' mb-1 w-full cursor-pointer rounded-xl text-left transition duration-100 hover:bg-gray-1'
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
            <span
              style={{ backgroundColor: item.color }}
              className={`block h-2.5 w-2.5 rounded-full`}
            ></span>
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function AvailableJobs({
  setAvailableJobs,
  errors,
  setErrors,
  availableJobs,
}: {
  setAvailableJobs: React.Dispatch<React.SetStateAction<string[]>>;
  errors: any;
  setErrors: any;
  availableJobs: any;
}) {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Work site A',
      color: '#7c9ba2',
      selected: false,
    },
    {
      id: 2,
      name: 'Project A',
      color: '#51a4b2',
      selected: false,
    },
    {
      id: 3,
      name: 'Customer 1',
      color: '#81a8cc',
      selected: false,
    },
    {
      id: 4,
      name: 'Shift manager',
      color: '#b57d9a',
      selected: false,
    },
  ]);
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const selectedJobs = data
      .filter((dataya) => dataya.selected)
      .map((item) => item.name);

    if (selectedJobs.length > 0) {
      setErrors((prev: any) => ({
        ...prev,
        availableJobs: false,
      }));
    }
    setAvailableJobs(selectedJobs);
  }, [data]);

  useEffect(() => {
    if (availableJobs) {
      setData((prev) => {
        return prev.map((item) => {
          if (availableJobs.includes(item.name)) {
            return { ...item, selected: true };
          }
          return item;
        });
      });
    }
  }, []);

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
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] w-[385px] overflow-hidden  rounded-2xl px-2  "
    >
      <button
        type="button"
        className={cn(
          'flex min-h-[40px] items-center justify-between gap-0.5 rounded-lg border bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2',
          errors.availableJobs && 'border-red-500'
        )}
      >
        <div className="flex flex-wrap gap-1">
          {data.filter((dataya) => dataya.selected).length > 0 ? (
            data
              .filter((dataya) => dataya.selected)
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-1 whitespace-nowrap rounded-md bg-gray-1 px-1 text-[12px] "
                  >
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`block h-2 w-2 rounded-full`}
                    ></span>
                    {item.name}
                  </div>
                );
              })
          ) : (
            <div className="text-secondary">No selected</div>
          )}
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
