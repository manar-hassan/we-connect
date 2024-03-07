'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { icons } from './icons-array';
import Image from 'next/image';

function IconsList({ item, setItem }: { item: any; setItem: any }) {
  const handleOnClick = (type: string) => {
    setItem((old: any) => ({
      ...old,
      icon: type,
    }));
  };

  return (
    <ul className=" grid grid-cols-3 overflow-hidden">
      {Object.keys(icons).map((el) => (
        <li
          key={el}
          //@ts-ignore
          onClick={() => handleOnClick(el)}
          className={cn(
            ' w-fit cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left transition duration-100 hover:bg-gray-1',
            el === item.icon && 'bg-blue-1 hover:bg-blue-2'
          )}
        >
          <Image //@ts-ignore
            src={icons[el]}
            alt={el}
            width={28}
            height={28}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Icons({ item, setItem }: { item: any; setItem: any }) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div onClick={() => setIsOpen(false)}>
          <IconsList item={item} setItem={setItem} />
        </div>
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-[1000] overflow-hidden rounded-2xl  "
    >
      <button className="peer flex h-10 items-center justify-between rounded-xl border bg-white px-2.5 text-primary transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white [&_svg]:text-gray-5">
        <Image //@ts-ignore
          src={icons[item.icon]}
          alt={item.icon}
          width={28}
          height={28}
        />
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
