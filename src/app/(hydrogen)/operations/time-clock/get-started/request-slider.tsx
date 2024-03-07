'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DropList from '../../../shared/drop-list';
import FilterIcon from '@/components/icons/filter';
import Calender from '@/app/(hydrogen)/shared/calender';
import SearchIcon from '@/components/icons/search-icon';
import NothingDisplay from '@/app/(hydrogen)/shared/nothing-display';
import FilterLine from './filter/filter-line';
import Button from '@/app/(hydrogen)/shared/button';
import ShiftTagsIcon from '@/components/icons/shift-tags';
import {
  useGetViewRequests,
  usePostResponseRequest,
} from '@/app/api/time-clock/request';
import Loading from '@/app/(hydrogen)/shared/loading';
import OwnerIcon from '@public/owner-icon.webp';
import { Avatar } from 'rizzui';
import Image from 'next/image';
import Separator from '@/app/(hydrogen)/shared/separator';

export default function RequestSlider() {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterLineNumber, setFilterLineNumber] = useState(1);
  const [requestOptions, setRequestOption] = useState([
    'Pending (0)',
    'History',
  ]);
  const [item, setItem] = useState(requestOptions[0]);
  const [allData, setAllData] = useState<{ id: number }[]>([]);

  const { isLoading, isError, error } = useGetViewRequests(
    {
      from: fromDate,
      to: toDate,
    },
    {
      onSuccess: (res) => {
        setRequestOption([
          `Pending (${res.data?.data.length || 0})`,
          'History',
        ]);
        setItem(`Pending (${res.data?.data.length || 0})`);
        setAllData(res.data?.data);
      },
    }
  );

  const response = usePostResponseRequest({
    onSuccess: (res) => {
      console.log('Request successful:', res.data.message.attendance_id);
      setAllData((prev) => {
        return prev.filter(
          (request) => request.id !== res.data.message.attendance_id
        );
      });
    },
  });

  console.log(response);


  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[70px] shrink-0 items-center justify-center gap-2 border-b border-[#e1e1e1] text-lg text-[#3f464880]">
        <span>Requests</span>
      </div>
      <div className="flex grow flex-col overflow-y-auto p-8">
        <div className="mb-5 flex w-full items-center justify-between">
          <div className="flex h-10 items-center gap-5">
            <DropList
              item={item}
              setItem={setItem}
              data={requestOptions}
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
            <div className="relative flex h-10 w-[225px] items-start justify-center rounded-full border border-[#d9d9d9] pl-[15px] pr-[35px] ">
              <input
                type="text"
                placeholder="Search"
                className="input-null h-full w-[173px]"
              />
              <div className="absolute right-3 top-3 ">
                <SearchIcon />
              </div>
            </div>
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
                  setFilterLineNumber={setFilterLineNumber}
                  filterLineNumber={filterLineNumber}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {isLoading ? (
          <div className="mt-52">
            <Loading />
          </div>
        ) : isError ? (
          <div>error</div>
        ) : allData.length === 0 ? (
          <NothingDisplay className="mt-[120px] h-auto" />
        ) : (
          <motion.div
            initial={{ opacity: 0, translateY: '20px' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 overflow-y-auto pr-2.5 text-center"
          >
            {allData.map((request: any, index: number) => (
              <div
                key={index}
                className="flex w-full items-start justify-between pt-10"
              >
                <div className="flex items-start gap-10">
                  <div className="flex max-w-[132px] flex-col items-center gap-2">
                    <div className="relative">
                      <Avatar
                        src={request.image}
                        name="Albert Flores"
                        color="invert"
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-2 h-5 w-5">
                        <Image src={OwnerIcon} alt="Owner Icon" />
                      </div>
                    </div>
                    <div className="text-base font-bold ">{request.name}</div>
                    <button className="text-gray">Add shift</button>
                    <button className="text-blue-6">Chat with user</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-left">Shift added:</div>
                    <div className="flex items-center gap-5">
                      <div>{request.date}</div>
                      <div>{request.date}</div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div>{request.clockIn}</div>
                      <div>to</div>
                      <div>{request.clockOut}</div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div>({request.totalHours} hours)</div>
                      <div className="flex items-center gap-2">
                        <div
                          style={{ backgroundColor: request.color }}
                          className="h-2.5 w-2.5 rounded-full"
                        ></div>
                        {request.job}
                      </div>
                    </div>
                  </div>
                </div>

                {request.shiftNotes && (
                  <>
                    <div className="flex h-full items-start gap-5  text-left">
                      <Separator height="70%" />
                      <div>
                        <div>Shift Note:</div>
                        <div>{request.shiftNote || ''}</div>
                      </div>
                    </div>
                  </>
                )}

                {request.requestNote && (
                  <>
                    <div className="flex h-full items-start gap-5  text-left">
                      <Separator height="70%" />
                      <div>
                        <div>Request Note:</div>
                        <div>{request.requestNote || ''}</div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    disabled={
                      response.isLoading &&
                      response.variables?.reqId === request.id
                    }
                    onClick={() =>
                      response.mutate({ reqId: request.id, status: 'accept' })
                    }
                    className="w-[100px] justify-center disabled:opacity-100"
                  >
                    {response.isLoading &&
                    response.variables?.reqId === request.id &&
                    response.variables?.status === 'accept' ? (
                      <Loading />
                    ) : (
                      'Approved'
                    )}
                  </Button>
                  <Button
                    disabled={
                      response.isLoading &&
                      response.variables?.reqId === request.id
                    }
                    onClick={() =>
                      response.mutate({ reqId: request.id, status: 'decline' })
                    }
                    className="w-[100px] justify-center text-red-600 disabled:opacity-100"
                  >
                    {response.isLoading &&
                    response.variables?.reqId === request.id &&
                    response.variables?.status === 'decline' ? (
                      <Loading bg="bg-red-600" />
                    ) : (
                      'Declined'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <div className="relative z-20 flex h-[70px] shrink-0 items-center justify-end border-t border-[#e1e1e1] px-8"></div>
    </div>
  );
}
