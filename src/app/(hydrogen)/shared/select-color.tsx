import ArrowDown from '@/components/icons/arrow-down';
import RightIcon from '@/components/icons/right-icon';
import cn from '@/utils/class-names';
import React, { useEffect, useState } from 'react';
import { Popover } from 'rizzui';
import { colors } from './colors';

const ColorList = ({
  setIsOpen,
  setColor,
  color: mainColor,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColor: (color: string, id?: string) => void;
  color: string;
  id?: string;
}) => {
  const handleSelectColor = (color: string) => {
    id ? setColor(id, color) : setColor(color);
    setIsOpen(false);
  };
  return (
    <ul className="grid grid-cols-4 gap-2">
      {colors.map((color) => (
        <li
          key={color}
          style={{ backgroundColor: color }}
          className="h-5 w-5 cursor-pointer rounded-full"
          onClick={() => handleSelectColor(color)}
        >
          {color === mainColor && (
            <div className="relative">
              <RightIcon className="left-1 top-1" />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default function SelectColor({
  color,
  setColor,
  id,
}: {
  color: string;
  setColor: (color: string, id?: string) => void;
  id?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <ColorList
          setIsOpen={setIsOpen}
          setColor={setColor}
          color={color}
          id={id}
        />
      )}
      shadow="sm"
      placement={'bottom-end'}
      className="z-[1000] overflow-hidden rounded-2xl p-2  "
    >
      <button className="peer flex h-10 items-center justify-between rounded-xl border bg-white px-2.5 text-primary transition duration-100 hover:bg-gray-1 focus:border-blue-6 active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white [&_svg]:text-gray-5">
        <div
          style={{ background: color }}
          className="h-5 w-5 rounded-full"
        ></div>
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
