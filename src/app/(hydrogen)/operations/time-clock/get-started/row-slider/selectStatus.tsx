'use client';

import { Popover } from '@/components/ui/popover';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import ArrowDown from '@/components/icons/arrow-down';
import cn from '@/utils/class-names';
import SearchIcon from '@/components/icons/search-icon';
import { ClassNameValue } from 'tailwind-merge';
import { IAttendance, IData } from './types';
import { useGetJobs } from '@/app/api/time-clock/jobs';
import Loading from '@/app/(hydrogen)/shared/loading';

function JobsList({
  setIsOpen,
  handleOnAttendanceChange,
  weekIndex,
  dayIndex,
  attendanceIndex,
  fullDate,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  weekIndex: number;
  dayIndex: number;
  attendanceIndex: number;
  handleOnAttendanceChange: (
    weekIndex: number,
    dayIndex: number,
    attendanceIndex: number,
    attendanceInput: keyof IAttendance,
    value: string | boolean,
    fullDate: string
  ) => void;
  fullDate: string;
}) {
  const { data, isLoading, isError } = useGetJobs();
  const jobs = data?.data?.data?.projects;
  const [text, setText] = useState('');
  const filteredData = () => {
    if (text) {
      return jobs.filter((item: any) =>
        item.project_name.toLowerCase().includes(text.toLowerCase())
      );
    }
    return jobs;
  };
  const handleOnClick = (item: any) => {
    handleOnAttendanceChange(
      weekIndex,
      dayIndex,
      attendanceIndex,
      'status',
      item.project_name,
      fullDate
    );
    handleOnAttendanceChange(
      weekIndex,
      dayIndex,
      attendanceIndex,
      'color',
      item.color,
      fullDate
    );
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <ul className="rounded-full ">
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
      {filteredData().map((item: any) => (
        <li
          key={item.id}
          onClick={() => handleOnClick(item)}
          className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 transition duration-100 hover:bg-gray-1"
        >
          <div className="flex items-center gap-2.5 ">
            <span
              style={{ backgroundColor: item.color }}
              className={`block h-5 w-5 shrink-0 rounded-full`}
            ></span>
            <div className="truncate">{item.project_name}</div>
          </div>
        </li>
      ))}
      {filteredData().length === 0 && <div className="p-2">No result</div>}
    </ul>
  );
}

export default function SelectStatus({
  status,
  color,
  handleOnAttendanceChange,
  weekIndex,
  dayIndex,
  attendanceIndex,
  buttonStyling,
  fullDate,
}: {
  status?: string;
  color?: string;
  weekIndex: number;
  dayIndex: number;
  attendanceIndex: number;
  handleOnAttendanceChange: (
    weekIndex: number,
    dayIndex: number,
    attendanceIndex: number,
    attendanceInput: keyof IAttendance,
    value: string | boolean,
    fullDate:string
  ) => void;
  buttonStyling: string;
  fullDate: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <JobsList
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleOnAttendanceChange={handleOnAttendanceChange}
          weekIndex={weekIndex}
          dayIndex={dayIndex}
          attendanceIndex={attendanceIndex}
          fullDate={fullDate}
        />
      )}
      shadow="sm"
      placement="bottom-start"
      showArrow={false}
      className="z-[1000] rounded-2xl px-2  "
    >
      <button
        style={{
          backgroundColor: color ? color : 'transparent',
        }}
        className={cn(
          ' flex h-[25px] w-[118px] items-center justify-between rounded-full  bg-white px-[10px] transition duration-100 hover:bg-gray-1 active:bg-gray-2',
          buttonStyling
        )}
      >
        {typeof status !== 'string' ? (
          <div className="w-full text-center">--</div>
        ) : (
          <>
            <span className="block w-[82px] truncate text-left text-white">
              {status}
            </span>
            <ArrowDown
              className={cn(
                'inline-block text-white opacity-50 transition duration-200',
                isOpen ? '-rotate-180 ' : 'rotate-0'
              )}
            />
          </>
        )}
      </button>
    </Popover>
  );
}
