'use client';

import { Popover } from '@/components/ui/popover';
import React, { useEffect, useRef, useState } from 'react';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import AvatarCus from '@/app/(hydrogen)/shared/avatar-customized';
import anonAdmin from '@public/quick-tasks/anon-admin.webp';
import Image from 'next/image';

function PostedList({ data, setValue }: { data: any; setValue: any }) {
  const handleSelecting = (name: string) => {
    setValue('showBy.name', name);
  };

  return (
    <ul className="max-h-[200px] w-full overflow-auto ">
      {data.map((item: any) => (
        <li
          key={item.id}
          onClick={() => handleSelecting(item.name)}
          className={cn(
            ' mb-1 w-full cursor-pointer rounded-xl text-left transition duration-100 hover:bg-gray-1',
            item.selected && 'bg-blue-1 hover:bg-blue-2'
          )}
        >
          <label
            htmlFor={item.name}
            className="relative flex w-full cursor-pointer items-center gap-2 p-2 text-primary"
          >
            {item.icon}
            Posted by {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function PostedBy({ setValue, getValues }: any) {
  const data = [
    {
      id: 0,
      name: 'Abdelrahman Saied',
      icon: (
        <AvatarCus
          name="Abdelrahmen Saied"
          customSize="24px"
          isAdmin
          imageSrc="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
        />
      ),
    },
    {
      id: 1,
      name: 'Stack18-1',
      icon: <Image src={anonAdmin} alt="Announce" width={24} height={24} />,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <PostedList data={data} setValue={setValue} />
        </div>
      )}
      shadow="sm"
      placement="bottom-end"
      className={cn('z-[1000] w-[452px] overflow-hidden  rounded-2xl px-2  ')}
    >
      <button
        type="button"
        className={cn(
          'flex min-h-[40px]  w-full items-center justify-between gap-0.5 rounded-xl border bg-white px-3 py-1 transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2'
        )}
      >
        <div className="flex items-center gap-2">
          {data
            .filter((item) => item.name === getValues('showBy.name'))
            .map((ele, index) => (
              <React.Fragment key={index}>
                {ele.icon} Posted by {ele.name}
              </React.Fragment>
            ))}
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
