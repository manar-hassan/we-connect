'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import { Switch } from 'rizzui';

function MapIndicatorList({
  activeButton,
  setActiveButton,
}: {
  activeButton: number;
  setActiveButton: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [jobsState, setJobsState] = useState(true);
  const [geoState, setGeoState] = useState(true);
  const [pointState, setPointState] = useState(false);

  const data = [
    {
      id: 0,
      name: 'Jobs location',
      state: jobsState,
      setState: setJobsState,
    },
    {
      id: 1,
      name: 'Geofenced sites',
      state: geoState,
      setState: setGeoState,
    },
    {
      id: 2,
      name: 'Points of interest',
      state: pointState,
      setState: setPointState,
    },
  ];

  return (
    <ul className="rounded-full">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex w-[200px] items-center justify-between rounded-xl p-2"
        >
          {item.name}{' '}
          <Switch
            checked={item.state}
            onChange={(e) => item.setState(e.target.checked)}
            className="h-6 [&_>label]:m-0"
          />
        </li>
      ))}
    </ul>
  );
}

export default function MapIndicator() {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(0);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <MapIndicatorList
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      )}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-50 rounded-2xl px-2  "
    >
      <button className="flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-blue-6 transition duration-100 hover:bg-gray-1 active:bg-gray-2">
        Map indicators
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
