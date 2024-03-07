import Button from '@/app/(hydrogen)/shared/button';
import DropList from '@/app/(hydrogen)/shared/drop-list';
import Search from '@/app/(hydrogen)/shared/search';
import Separator from '@/app/(hydrogen)/shared/separator';
import ExportIcon from '@/components/icons/export';
import FilterIcon from '@/components/icons/filter';
import AddTask from './add-task';
import ViewBy from './view-by';
import Contains from './contains';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import CalenderRange from '@/app/(hydrogen)/shared/calender-range';
const SingleTask = dynamic(() => import('./single-task/add-single-task'), {
  ssr: false,
});
const Overdue = dynamic(() => import('./overdue/overdue'), {
  ssr: false,
});

export default function TabsOptions({
  viewBy,
  setViewBy,
  groupBy,
  setGroupBy,
  contains,
  setContains,
  startRangeDate,
  setStartRangeDate,
  endRangeDate,
  setEndRangeDate,
}: {
  viewBy: string;
  setViewBy: React.Dispatch<React.SetStateAction<string>>;
  groupBy: string;
  setGroupBy: React.Dispatch<React.SetStateAction<string>>;
  contains: string;
  setContains: React.Dispatch<React.SetStateAction<string>>;
  startRangeDate: Date | null;
  setStartRangeDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endRangeDate: Date | null;
  setEndRangeDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  const [openSingleTask, setOpenSingleTask] = useState(false);
  const [openOverdue, setOpenOverdue] = useState(false);
  const groupByData = ['title', 'label', 'assigned to', 'none'];
  const handleOpenSingeTask = () => {
    setOpenSingleTask(true);
  };
  const handleOpenOverdue = () => {
    setOpenOverdue(true);
  };

  return (
    <div className="mb-5 flex flex-col gap-5">
      <div className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-5">
          <div>View by</div>
          <ViewBy viewBy={viewBy} setViewBy={setViewBy} />
          <Separator />
          <div>Group by</div>
          <DropList
            item={groupBy}
            setItem={setGroupBy}
            data={groupByData}
            buttonClassName="rounded-full w-[132px] whitespace-nowrap"
            panelClassName="w-[132px]"
          />
          <Separator />
          <button className="flex h-10 w-10 items-center justify-center rounded-full border text-blue-6 transition duration-100 hover:border-blue-6 active:border-blue-7">
            <FilterIcon />
          </button>
          {viewBy === 'dates' && (
            <CalenderRange
              startRangeDate={startRangeDate}
              endRangeDate={endRangeDate}
              setStartRangeDate={setStartRangeDate}
              setEndRangeDate={setEndRangeDate}
            />
          )}
        </div>
        <div className="flex items-center gap-5">
          <Search />
          <Separator />
          <Button hover>
            <ExportIcon />
            Export
          </Button>
          <Separator />
          <DropList
            item="Add Task"
            content={<AddTask openSingleTask={handleOpenSingeTask} />}
            buttonClassName="rounded-full bg-blue-6 hover:bg-blue-7 active:bg-ble-8 text-white border-blue-6 w-[118px]"
            panelClassName="w-[118px] p-1"
          />
        </div>
      </div>
      <div className="h-px w-full bg-[#dcdcdc]"></div>
      <div className="flex items-center justify-between ">
        <Contains contains={contains} setContains={setContains} />
        <Button
          onClick={handleOpenOverdue}
          className="border-red-100 bg-red-100 pl-1 text-red-600 hover:border-red-600 hover:bg-red-200 active:border-red-700 active:bg-red-200 "
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 font-bold text-white">
            1
          </div>
          overdue task
        </Button>
      </div>
      <SingleTask isOpen={openSingleTask} setIsOpen={setOpenSingleTask} />
      <Overdue isOpen={openOverdue} setIsOpen={setOpenOverdue} />
    </div>
  );
}
