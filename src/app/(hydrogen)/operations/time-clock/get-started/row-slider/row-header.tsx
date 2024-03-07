'use client';
import Button from '@/app/(hydrogen)/shared/button';
import CalenderRange from '@/app/(hydrogen)/shared/calender-range';
import DropList from '@/app/(hydrogen)/shared/drop-list';
import SideSlider from '@/app/(hydrogen)/shared/side-slider';
import LockIcon from '@/components/icons/lock';
import Messages from '@/components/icons/messages';
import PlusIcon from '@/components/icons/plus';
import SunIcon from '@/components/icons/sun';
import AvatarCard from '@/components/ui/avatar-card';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { IRow } from './row-slider';
import { IAttendance } from './types';
import TableActions from '@/app/(hydrogen)/shared/table-actions';
import DeleteIcon from '@/components/icons/delete';
import UserCard from '@/app/(hydrogen)/shared/user-card';

const exportData = [
  'Payroll Totals',
  'Timesheets',
  'Timesheets PDF',
  'Shift report',
  'Shift report PDF',
];

const addData = [
  {
    icon: <PlusIcon />,
    title: 'Add Shift',
  },
  {
    icon: <SunIcon />,
    title: 'Add time off',
  },
];

const AddContent = () => {
  const [openSideSlide, setOpenSideSlide] = useState(false);
  return (
    <>
      <ul className=" max-h-[220px] w-full overflow-auto">
        {addData.map((el) => (
          <li
            key={el.title}
            onClick={() => setOpenSideSlide(true)}
            className={cn(
              'flex cursor-pointer items-center  gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left text-primary transition duration-100 hover:bg-gray-1'
            )}
          >
            {el.icon} {el.title}
          </li>
        ))}
      </ul>

      {/*       <SideSlider
        isOpen={openSideSlide}
        titleIcon={<PlusIcon />}
        titleName="Add Shift"
        onClose={()=>setOpenSideSlide(false)}
      >
        <div>omar</div>
      </SideSlider> */}
    </>
  );
};

const ExportContent = () => {
  return (
    <ul className=" max-h-[220px] w-full overflow-auto">
      {exportData.map((el) => (
        <li
          key={el}
          className={cn(
            'flex cursor-pointer items-center  gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left text-primary transition duration-100 hover:bg-gray-1'
          )}
        >
          {el}
        </li>
      ))}
    </ul>
  );
};
export default function RowHeader({
  record,
  selectedShifts,
  startRangeDate,
  setStartRangeDate,
  endRangeDate,
  setEndRangeDate,
  data,
  index,
}: {
  record: IRow;
  selectedShifts: IAttendance[];
  startRangeDate: Date | null;
  endRangeDate: Date | null;
  setStartRangeDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndRangeDate: React.Dispatch<React.SetStateAction<Date>>;
  data: any[];
  index: number;
}) {
  return (
    <div className="relative z-20 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl border-b border-gray-2 bg-white px-7 py-5">
      <div className="flex items-center ">
        <UserCard
          name={`${data[index].firstName} ${data[index].lastName}`}
          imageSrc={data[index].avatar}
          phoneNumber="00"
          userId={data[index].id}
        />
        <p className="ml-2.5 font-bold">{`${data[index].firstName} ${data[index].lastName}`}</p>
        <button className="ml-2 mr-3">
          <Messages />
        </button>
        <div className="h-11 w-px bg-gray-2"></div>
        <div className="mx-4 flex items-center">
          <div className="mr-2">Pay period : </div>
          <div className="z-20">
            <CalenderRange
              startRangeDate={startRangeDate}
              //@ts-ignore
              setStartRangeDate={setStartRangeDate}
              endRangeDate={endRangeDate}
              //@ts-ignore
              setEndRangeDate={setEndRangeDate}
            />
          </div>
          <button className="ml-2.5 flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-1 active:bg-gray-2">
            <LockIcon />
          </button>
        </div>
        <div className="ml-2.5">
          <TableActions
            checkedItems={selectedShifts}
            placement="bottom"
            content={
              <ul className="p-1">
                <li className="flex cursor-pointer items-center gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1">
                  <DeleteIcon /> Delete entries
                </li>
              </ul>
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button className="text-red">Conflicts</Button>
        <div className="mx-2 h-11 w-px bg-gray-2"></div>
        <DropList
          buttonName="Add"
          buttonClassName="rounded-full text-blue-6"
          content={<AddContent />}
        />
        <DropList
          buttonName="Export"
          buttonClassName="rounded-full text-blue-6"
          content={<ExportContent />}
        />
      </div>
    </div>
  );
}
