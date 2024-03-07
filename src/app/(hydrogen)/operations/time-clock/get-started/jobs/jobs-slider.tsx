'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DropList from '../../../../shared/drop-list';
import FilterIcon from '@/components/icons/filter';
import Calender from '@/app/(hydrogen)/shared/calender';
import SearchIcon from '@/components/icons/search-icon';
import FilterLine from '../filter/filter-line';
import Button from '@/app/(hydrogen)/shared/button';
import ShiftTagsIcon from '@/components/icons/shift-tags';
import Table from './table';
import { addMultipleTimes } from '@/utils/addTimes';
import Search from '@/app/(hydrogen)/shared/search';

interface IProps {
  filterBy?: string;
  secFilter?: string;
  job?: string;
  openFilterRow?: boolean;
  jobsData: any;
}

export default function JobsSlider({
  filterBy,
  secFilter,
  job,
  openFilterRow,
  jobsData,
}: IProps) {
  const globalTotalHoursArray: string[] = [];
  jobsData.forEach((element: any) => {
    globalTotalHoursArray.push(element.totalHours);
  });
  const globalTotalHours = addMultipleTimes(globalTotalHoursArray);
  const currentDate = new Date();
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(currentDate.setDate(currentDate.getDate() - 14))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [openFilter, setOpenFilter] = useState(openFilterRow || false);
  const [filterLineNumber, setFilterLineNumber] = useState(1);

  const jobsOptions = ['Users', 'Job'];
  const [item, setItem] = useState(jobsOptions[1]);
  const [filterText, setFilterText] = useState('');

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[70px] shrink-0 items-center justify-center gap-2 border-b border-[#e1e1e1] text-lg text-[#3f464880]">
        <div className="flex items-center gap-2 text-sm">
          <ShiftTagsIcon /> Shift tags
        </div>
      </div>
      <div className="flex grow flex-col overflow-y-auto p-8">
        <div className="mb-5 flex w-full items-center justify-between">
          <div className="flex h-10 items-center gap-5">
            view by
            <DropList
              item={item}
              setItem={setItem}
              data={jobsOptions}
              buttonClassName="w-[132px] rounded-full "
              panelClassName="w-[132px]"
            />
            <div className=" mx-auto h-10 w-px bg-gray-200"></div>
            <button
              onClick={() => setOpenFilter(true)}
              className="flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-blue-5 transition duration-100 hover:bg-gray-1 active:border-blue-6 active:bg-gray-2"
            >
              <FilterIcon /> Filter
            </button>
            <div className=" mx-auto h-10 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2.5">
              From:{' '}
              <Calender
                date={fromDate}
                setDate={setFromDate}
                placeholder="From"
                buttonStyling="w-[120px]"
              />
            </div>
            <div className="flex items-center gap-2.5">
              To:{' '}
              <Calender
                date={toDate}
                setDate={setToDate}
                placeholder="To"
                buttonStyling="w-[120px]"
                minDate={fromDate}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center">
              <div className="text-blue-6">{globalTotalHours}</div>
              <div>Total hours</div>
            </div>

            <Search text={filterText} setText={setFilterText} />

            <div className=" mx-auto h-10 w-px bg-gray-200"></div>
            <Button>Export</Button>
          </div>
        </div>
        <AnimatePresence>
          {openFilter && (
            <motion.div
              animate={{
                height: 'auto',
                marginTop: '20px',
                marginBottom: '-20px',
              }}
              initial={{
                height: '0',
                marginTop: '0',
                marginBottom: '0',
              }}
              exit={{ height: '0', marginTop: '0', marginBottom: '0' }}
              className="overflow-hidden "
            >
              {Array.from({ length: filterLineNumber }).map((_, index) => (
                <FilterLine
                  key={index}
                  setOpenFilter={setOpenFilter}
                  filterBy={filterBy}
                  secFilter={secFilter}
                  job={job}
                  setFilterLineNumber={setFilterLineNumber}
                  filterLineNumber={filterLineNumber}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-1 overflow-y-auto">
          <Table data={jobsData} searchText={filterText} />
        </div>
      </div>
      <div className="relative z-20 flex h-[70px] shrink-0 items-center justify-end border-t border-[#e1e1e1] px-8"></div>
    </div>
  );
}
