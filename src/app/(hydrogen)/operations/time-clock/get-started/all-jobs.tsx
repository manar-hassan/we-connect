'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import SearchIcon from '@/components/icons/search-icon';
import { useGetJobs } from '@/app/api/time-clock/jobs';
import Loading from '@/app/(hydrogen)/shared/loading';

const data = [
  {
    id: 0,
    name: 'All jobs',
  },
  {
    id: 1,
    name: 'Work site A',
    color: '#7c9ba2',
  },
  {
    id: 2,
    name: 'Project A',
    color: '#51a4b2',
  },
  {
    id: 3,
    name: 'Customer 1',
    color: '#81a8cc',
  },
  {
    id: 4,
    name: 'Shift manager',
    color: '#b57d9a',
  },
];

function JobsList({
  setActiveButton,
  setIsOpen,
}: {
  setActiveButton: React.Dispatch<React.SetStateAction<any>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [text, setText] = useState('');
  const filteredData = () => {
    if (text) {
      return jobs.filter((item) =>
        item.project_name.toLowerCase().includes(text.toLowerCase())
      );
    }
    return jobs;
  };
  const { data: jobsData, isError, isLoading } = useGetJobs();
  const jobs = [
    {
      id: 0,
      project_name: 'All jobs',
    },
    ...jobsData?.data?.data?.projects,
  ];

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <ul className=" max-h-[200px] overflow-auto">
      <div className="mb-2 flex w-full items-center justify-between border-b py-2 pl-2">
        <input
          style={{ width: 'inherit' }}
          type="text"
          className="border-none p-0 text-sm focus:border-none focus:ring-transparent"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <SearchIcon />
      </div>
      {filteredData().map((item) => (
        <li
          key={item.id}
          onClick={() => {
            setActiveButton(item);
            setIsOpen(false);
          }}
          className="flex cursor-pointer items-center gap-2 px-2 py-1 transition duration-100 hover:bg-gray-1"
        >
          {item.color ? (
            <div className="flex items-center gap-2.5">
              <span
                style={{ backgroundColor: item.color }}
                className={`block h-5 w-5 rounded-full`}
              ></span>
              {item.project_name}
            </div>
          ) : (
            <div className="ml-2.5">{item.project_name}</div>
          )}
        </li>
      ))}
      {filteredData().length === 0 && <div className="p-2">No result</div>}
    </ul>
  );
}

export default function AllJobs({
  activeButton,
  setActiveButton,
}: {
  activeButton: any;
  setActiveButton: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <JobsList setActiveButton={setActiveButton} setIsOpen={setIsOpen} />
      )}
      shadow="sm"
      placement= 'bottom-start'
      className="z-50 rounded-2xl px-2  "
      showArrow={false}
    >
      <button className="flex h-10 items-center justify-between rounded-full border bg-white px-4 transition duration-100 hover:bg-gray-1 active:bg-gray-2">
        {activeButton.project_name}
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
