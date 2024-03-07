'use client';

import { Popover } from '@/components/ui/popover';
import React, { useEffect, useRef, useState } from 'react';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import RightIcon from '@/components/icons/right-icon';
import SearchIcon from '@/components/icons/search-icon';
import { Avatar } from 'rizzui';
import Button from '@/app/(hydrogen)/shared/button';
import X from '@/components/icons/x';
import { colors } from '@/app/(hydrogen)/shared/colors';
import SelectColor from '@/app/(hydrogen)/shared/select-color';

function AvailableList({
  data,
  setData,
  setValue,
  getValues,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setValue: any;
  getValues: any;
}) {
  const [newColor, setNewColor] = useState(
    colors[Math.floor(Math.random() * 30)]
  );
  const [newTitle, setNewTitle] = useState({
    text: '',
    isError: false,
  });
  const [text, setText] = useState('');
  const filteredData = () => {
    if (text) {
      return data.filter((item: any) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    }
    return data;
  };
  const [isAddLabel, setIsAddLabel] = useState(false);
  const handleSelectItem = (label: any) => {
    setData((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === label.id) {
          return { ...item, selected: true };
        } else {
          return item;
        }
      });
    });

    const labels = getValues('labels');
    labels.push({
      title: label.title,
      color: label.color,
      id: label.id,
    });
    setValue('labels', labels);
  };

  const handleAddLabel = () => {
    if (newTitle.text === '') {
      setNewTitle((prev) => ({ ...prev, isError: true }));
      return;
    }
    setData((prev: any) => [
      ...prev,
      {
        id: Math.random(),
        title: newTitle.text,
        color: newColor,
        selected: false,
      },
    ]);
    setNewTitle((prev) => ({ ...prev, text: '' }));
    setNewColor(colors[Math.floor(Math.random() * 30)]);
    setIsAddLabel(false);
  };

  const handleChangeTitle = (e: any) => {
    setNewTitle((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleOnFocus = () => {
    setNewTitle((prev) => ({ ...prev, isError: false }));
  };
  return (
    <>
      {' '}
      <ul className="max-h-[250px] min-h-[170px] w-full overflow-auto ">
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
        {filteredData()
          .filter((item: any) => item.selected === false)
          .map((item: any) => (
            <li
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className={cn(
                ' mb-1 w-full cursor-pointer rounded-xl text-left transition duration-100 hover:bg-gray-1',
                item.selected && 'bg-blue-1 hover:bg-blue-2'
              )}
            >
              <label
                htmlFor={item.title}
                className="relative flex w-full cursor-pointer items-center gap-2 p-2 text-primary"
              >
                <div
                  style={{ backgroundColor: item.color }}
                  className="h-3 w-3 rounded-full"
                ></div>
                {item.title}
              </label>
            </li>
          ))}
      </ul>
      <div className="flex h-14 items-center justify-center border-t">
        {isAddLabel ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <SelectColor color={newColor} setColor={setNewColor} />
              <input
                type="text"
                value={newTitle.text}
                onChange={(e) => handleChangeTitle(e)}
                onFocus={handleOnFocus}
                placeholder="type a text"
                className={cn(
                  ' w-36 rounded-xl  border-gray-200 outline-none focus:outline-none focus:ring-transparent',
                  newTitle.isError && 'border-red-600'
                )}
              />
            </div>
            <Button onClick={handleAddLabel} variant="secondary">
              Add
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsAddLabel(true)} variant="secondary">
            Add label
          </Button>
        )}
      </div>
    </>
  );
}

export default function SelectLabel({ setValue, getValues }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 0,
      title: 'General',
      color: 'green',
      selected: false,
    },
    {
      id: 1,
      title: 'private',
      color: 'blue',
      selected: false,
    },
  ]);

  const handleDeselectItem = (id: number) => {
    setData((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === id) {
          return { ...item, selected: false };
        } else {
          return item;
        }
      });
    });

    const labels = getValues('labels');
    const newLabels = labels.filter((item: any) => item.id !== id);
    console.log(labels, newLabels);
    setValue('labels', newLabels);
  };

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div>
          <AvailableList
            data={data}
            setData={setData}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
      )}
      shadow="sm"
      placement="top"
      className={cn(
        'z-[1000] w-[341.6px] overflow-hidden rounded-2xl  px-2 pb-0  '
      )}
    >
      <button
        type="button"
        className={cn(
          'flex min-h-[40px] w-full items-center justify-between gap-0.5 rounded-xl border bg-white px-3 py-1 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2'
        )}
      >
        <div className="flex flex-wrap gap-1">
          {getValues('labels').length > 0
            ? getValues('labels').map((item: any) => (
                <div
                  key={item.id}
                  style={{ backgroundColor: item.color }}
                  className="flex items-center gap-1 whitespace-nowrap rounded-md bg-gray-1 px-2 py-1  text-white "
                >
                  {item.title}
                  <div
                    onClick={() => {
                      handleDeselectItem(item.id);
                    }}
                  >
                    <X />
                  </div>
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
