'use client';
import Table from './table';
import RowHeader from './row-header';
import Summary from './summary';
import { Fragment, useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import CustomTable from './custom-table';
import { IAttendance, IDay } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/app/(hydrogen)/shared/button';
import DeleteIcon from '@/components/icons/delete';
import ActionInCalenderIcon from '@/components/icons/action-in-calender';
import LockIcon from '@/components/icons/lock';
import UnlockIcon from '@/components/icons/unlock';
import { useGetAttendances } from '@/app/api/time-clock/attendances';
import Loading from '@/app/(hydrogen)/shared/loading';
import UserCard from '@/app/(hydrogen)/shared/user-card';
import { addMultipleTimes } from '@/utils/addTimes';

export interface IRow {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  groups: string;
  email: string;
  userTags: string;
  title: string;
  employmentStartDate: string;
  team: string;
  department: string;
  branch: string;
  directManager: string;
  birthday: string;
  job: string;
  clockIn: Date;
  clockOut: Date;
  totalHours: Date | string;
  regularHours: Date | string;
  overtime: Date | string;
  paidTimeOff: Date | string;
  unpaidTimeOff: Date | string;
}

export default function RowSlider({
  record,
  index: rowIndex,
  data,
}: {
  record: IRow;
  index: number;
  data: any[];
}) {
  const [selectedShifts, setSelectedShifts] = useState<IAttendance[]>([]);
  const [selectedDays, setSelectedDays] = useState<IDay[]>([]);
  const currentDate = new Date();
  const [fromDate, setFromDate] = useState<Date>(
    new Date(currentDate.setDate(currentDate.getDate() - 14))
  );
  const [toDate, setToDate] = useState<Date>(new Date());
  const [recordId, setRecordId] = useState(record.id);
  const [index, setIndex] = useState(rowIndex);
  const {
    data: tableData,
    isLoading,
    isError,
    isFetchedAfterMount,
  } = useGetAttendances({
    userId: recordId,
    from: fromDate,
    to: toDate,
  });

  let regular = '00:00';
  tableData?.data.data.result.forEach(
    (item: any) => (regular = addMultipleTimes([regular, item.weeklyTotal]))
  );

  return (
    <>
      {data[index + 1] !== undefined && (
        <div className="after:content-[' '] after:rounded-tr-4 after:rounded-tl-4 before:content-[' ']  absolute right-0 top-[-50px] z-10 flex h-[56px] w-[270px] flex-row-reverse before:absolute before:block before:h-4 before:w-4 before:translate-y-[50px] before:bg-white after:absolute after:bottom-[-26px] after:block after:h-8 after:w-full after:shadow-4">
          <div
            onClick={() => {
              setRecordId(data[index + 1].id);
              setIndex(index + 1);
            }}
            className="flex w-[210px] cursor-pointer items-center justify-between rounded-tl-[10px] bg-white px-2.5 pb-1.5"
          >
            <UserCard
              name={`${data[index + 1].firstName} ${data[index + 1].lastName}`}
              imageSrc={data[index + 1].avatar}
              phoneNumber="00"
              size="sm"
              tooltipArrowClassName="!top-5"
              userId={data[index + 1].id}
            />
            <p>NEXT EMPLOYEE &gt; </p>
          </div>
          <div className="-mr-[13px] mt-1.5 w-5 scale-x-50 cursor-pointer border-[25px] border-white border-l-transparent border-t-transparent"></div>
        </div>
      )}
      {data[index - 1] !== undefined && (
        <div className="after:content-[' '] after:rounded-tr-4 after:rounded-tl-4 before:content-[' '] absolute left-0 top-[-50px]  z-10 flex h-[56px] w-[270px] flex-row before:absolute before:block before:h-4 before:w-4 before:translate-y-[50px] before:bg-white after:absolute after:bottom-[-26px] after:block after:h-8 after:w-full after:shadow-4">
          <div
            onClick={() => {
              setRecordId(data[index - 1].id);
              setIndex(index - 1);
            }}
            className="flex w-[210px] cursor-pointer items-center justify-between rounded-tr-[10px] bg-white pb-1.5 pl-2.5 "
          >
            <UserCard
              name={`${data[index - 1].firstName} ${data[index - 1].lastName}`}
              imageSrc={data[index - 1].avatar}
              phoneNumber="00"
              size="sm"
              tooltipArrowClassName="!top-5"
              userId={data[index - 1].id}
            />{' '}
            <p className="whitespace-nowrap">&lt; PREVIOUS EMPLOYEE</p>
          </div>
          <div className="-ml-[13px] mt-1.5 w-5 scale-x-50 cursor-pointer border-[25px] border-white border-r-transparent border-t-transparent"></div>
        </div>
      )}
      <div className="relative flex h-full flex-col">
        <RowHeader
          record={record}
          data={data}
          index={index}
          selectedShifts={selectedShifts}
          startRangeDate={fromDate}
          endRangeDate={toDate}
          setStartRangeDate={setFromDate}
          setEndRangeDate={setToDate}
        />
        <Summary isLoading={isLoading} regular={regular} />
        <div className="w-full flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex h-64 w-full justify-center pt-10">
              <Loading />
            </div>
          ) : (
            <CustomTable
              setSelectedShifts={setSelectedShifts}
              setSelectedDays={setSelectedDays}
              tableData={tableData?.data.data.result}
              startRange={fromDate}
              endRange={toDate}
              userId={record.id}
            />
          )}
        </div>
        <AnimatePresence>
          {selectedDays.length > 0 && (
            <div className="absolute bottom-14 left-1/2 z-20 -translate-x-1/2  ">
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0 }}
                className=" flex items-center gap-16 rounded-3xl bg-white p-4 shadow-4"
              >
                <div className="whitespace-nowrap font-bold">
                  {selectedDays.length} Selected{' '}
                </div>
                <div className="flex items-center gap-2">
                  <Button>
                    <ActionInCalenderIcon /> Add Shifts
                  </Button>
                  <Button>
                    <LockIcon width="15" height="15" /> Lock
                  </Button>
                  <Button disabled>
                    <UnlockIcon /> Unlock
                  </Button>
                  <Button className="p-2.5 text-red-600">
                    <DeleteIcon />
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
