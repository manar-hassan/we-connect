'use client';
import { useState } from 'react';
import calenderGray from '@public/time-clock/ic_calendar_grey.png';
import calenderBlue from '@public/time-clock/ic_calendar_green.svg';
import historyGray from '@public/time-clock/ic_history_grey.png';
import historyBlue from '@public/time-clock/ic_history_green.svg';
import Image from 'next/image';
import cn from '@/utils/class-names';

import TodayTable from './table/today-table';
import PlusIcon from '@/components/icons/plus';
import EqualIcon from '@/components/icons/equal';
import punchClock from '@public/time-clock/Icon_punch_clock.png';
import syncRound from '@public/time-clock/sync-round@2x.png';
import Link from 'next/link';
import JobIcon from '@/components/icons/job';
import More from './more';
import ArrowRightPink from '@/components/icons/arrow-right-pink';
import Settings from './settings/settings-button';
import SettingSlider from './settings/settings-slider';
import MapContainer from './map/map-container';
import ViewRequests from './settings/view-requests-jobs';
import RequestSlider from './request-slider';
import NothingDisplay from '@/app/(hydrogen)/shared/nothing-display';
import { useGetSettings } from '@/app/api/time-clock/settings';
import Loading from '@/app/(hydrogen)/shared/loading';
import JobsInsights from './jobs/jobs-insights';
import { useGetTable } from '@/app/api/time-clock/table';
import Slider from '@/app/(hydrogen)/shared/slider';
import TimesheetTable from './table/timesheet-table';
import { useGetTimesheetJobs } from '@/app/api/time-clock/timesheet-jobs';
import SemiUserCard from '@/app/(hydrogen)/shared/semi-user-card';
import { useGetJobs } from '@/app/api/time-clock/jobs';
import { useGetMap } from '@/app/api/time-clock/map';
import { formatDate } from '@/utils/format-date';
import { addMultipleTimes } from '@/utils/addTimes';

interface IRow {
  id: string;
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

const d: IRow[] = [
  {
    id: 'test',
    firstName: 'Abdo',
    avatar: '',
    lastName: '',
    groups: '',
    email: '',
    userTags: '',
    title: '',
    employmentStartDate: '',
    team: '',
    department: '',
    branch: '',
    directManager: '',
    birthday: '',
    job: 'project A',
    clockIn: new Date('2023-10-18T13:24:00.760Z'),
    clockOut: new Date('2023-10-18T18:24:00.760Z'),
    totalHours: '12:00',
    regularHours: '12:00',
    overtime: '--',
    paidTimeOff: '--',
    unpaidTimeOff: '',
  },
  {
    id: '86740',
    firstName: 'Lucia',
    lastName: 'Kshlerin',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
    email: 'Mason_Davis4@yahoo.com',
    job: 'project A',
    clockIn: new Date('2023-01-14T20:37:08.482Z'),
    clockOut: new Date('2023-01-14T23:37:08.482Z'),
    totalHours: '12:00',
    regularHours: '12:00',
    groups: '',
    userTags: '',
    title: '',
    employmentStartDate: '',
    team: '',
    department: '',
    branch: '',
    directManager: '',
    birthday: '',
    overtime: '--',
    paidTimeOff: '--',
    unpaidTimeOff: '',
  },
];

const ShowLoading = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    data: settingsData,
    isError: settingsError,
    isLoading: settingsLoading,
  } = useGetSettings();
  const {
    data: todayTableData,
    isError: todayTableError,
    isLoading: todayTableLoading,
  } = useGetTable('today');
  const {
    data: timesheetTableData,
    isError: timesheetTableError,
    isLoading: timesheetTableLoading,
  } = useGetTable('timesheet');
  const {
    data: timesheetJobsData,
    isError: timesheetJobsError,
    isLoading: timesheetJobsLoading,
  } = useGetTimesheetJobs();
  const {
    data: mainJobsData,
    isError: mainJobsError,
    isLoading: mainJobsLoading,
  } = useGetJobs();
  const {
    data: mapData,
    isError: mapError,
    isLoading: mapLoading,
  } = useGetMap({ date: formatDate(new Date()) });

  const loading =
    settingsLoading ||
    todayTableLoading ||
    timesheetTableLoading ||
    timesheetJobsLoading ||
    mainJobsLoading ||
    mapLoading;
  const error =
    settingsError ||
    todayTableError ||
    timesheetTableError ||
    timesheetJobsError ||
    mainJobsError ||
    mapError;

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loading />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        Error
      </div>
    );
  } else {
    setLoading(false);
  }
};

export default function Page() {
  const [page, setPage] = useState<string>('today');
  const [startRangeDate, setStartRangeDate] = useState(new Date());
  const today = new Date();
  const [endRangeDate, setEndRangeDate] = useState(
    new Date(today.getDay() - 14)
  );
  const [mapDate, setMapDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const {
    data: settingsData,
    isError: settingsError,
    isLoading: settingsLoading,
  } = useGetSettings();
  const {
    data: todayTableData,
    isError: todayTableError,
    isLoading: todayTableLoading,
  } = useGetTable('today');
  const {
    data: timesheetTableData,
    isError: timesheetTableError,
    isLoading: timesheetTableLoading,
  } = useGetTable('timesheet');
  const {
    data: timesheetJobsData,
    isError: timesheetJobsError,
    isLoading: timesheetJobsLoading,
  } = useGetTimesheetJobs();
  const {
    data: mainJobsData,
    isError: mainJobsError,
    isLoading: mainJobsLoading,
  } = useGetJobs();
  const {
    data: mapData,
    isError: mapError,
    isLoading: mapLoading,
  } = useGetMap({ date: formatDate(mapDate) });

  const totalRegularArray: string[] = timesheetTableData?.data?.data
    .map((row: any) => row.unpaidTimeOff)
    .filter(
      (unpaidTimeOff: string) =>
        unpaidTimeOff !== null &&
        unpaidTimeOff !== undefined &&
        unpaidTimeOff !== ''
    );
  const totalRegular = addMultipleTimes(totalRegularArray || []);

  const paidTimeOffArray: string[] = timesheetTableData?.data.data
    .map((row: any) => row.paidTimeOff)
    .filter(
      (paidTimeOff: string) =>
        paidTimeOff !== null && paidTimeOff !== undefined && paidTimeOff !== ''
    );

  const paidTimeOff = addMultipleTimes(paidTimeOffArray || []);
  const totalPaid = addMultipleTimes([totalRegular, paidTimeOff] || []);

  const unpaidTimeArray: string[] = timesheetTableData?.data.data
    .map((row: any) => row.unpaidTimeOff)
    .filter(
      (unpaidTimeOff: string) =>
        unpaidTimeOff !== null &&
        unpaidTimeOff !== undefined &&
        unpaidTimeOff !== ''
    );
  const unpaidTime = addMultipleTimes(unpaidTimeArray || []);

  if (loading) {
    return <ShowLoading setLoading={setLoading} />;
  }

  return (
    <>
      <section className="mb-4 flex items-center justify-between rounded-2xl bg-white p-5 shadow-tap-content">
        <div className="flex items-center text-base ">
          <Image src={punchClock} alt="clock" width={50} height={50} />
          <h1 className="mr-5 text-2xl font-normal">Time Clock</h1>
          <div className="flex h-[30px] items-center rounded-2xl bg-[#d7eaf9] pr-2.5 text-base">
            <Image
              src={syncRound}
              alt="sync"
              width={30}
              height={30}
              className="mr-1.5"
            />
            <span>Synced with:</span>
            <Link href="#" className="text-blue-6 underline">
              job scheduler
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-0.5 w-min">Asset admins</span>
          <div className="mr-4">
            <SemiUserCard
              imageSrc="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
              name="Abdelrahman saied"
              isAdmin
            />
          </div>
          <button className="flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-blue-5 transition duration-100 hover:bg-gray-1 active:bg-gray-2">
            <JobIcon />
            Jobs
          </button>
          <Settings
            placement="bottom"
            modalView={
              <Slider>
                <SettingSlider settings={settingsData} />
              </Slider>
            }
          />
          <More />
          <button className="flex h-10 items-center gap-2 rounded-full border-[0.5px] border-[#fee2fa] bg-white px-2 text-[#bb3aa9] shadow-[0_1px_2px_0_rgba(0,0,0,.06)] transition duration-100 ">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fee2fa]">
              <ArrowRightPink />
            </div>
            Learn about this feature
          </button>
        </div>
      </section>

      <section>
        {/* Tabs Row */}
        <div className="grid grid-cols-2 text-[17px] uppercase">
          <div
            onClick={() => setPage('today')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-t-2xl py-5',
              page === 'today' && 'bg-white text-blue-6 shadow-tab'
            )}
          >
            <Image
              src={page === 'today' ? calenderBlue : calenderGray}
              alt="calender"
              width={15}
              height={15}
            />
            today
          </div>
          <div
            onClick={() => setPage('timesheet')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-t-2xl py-5',
              page === 'timesheet' && 'bg-white text-blue-6 shadow-tab'
            )}
          >
            {' '}
            <Image
              src={page === 'timesheet' ? historyBlue : historyGray}
              alt="calender"
              width={15}
              height={15}
            />{' '}
            timesheets
          </div>
        </div>

        <div
          className={cn(
            'relative z-10 rounded-b-2xl bg-white p-5 shadow-tap-content',
            page === 'today' ? 'rounded-tr-2xl' : 'rounded-tl-2xl '
          )}
        >
          <div className="mb-5 w-full">
            {page === 'today' ? (
              <TodayTable data={todayTableData?.data?.data} page="today">
                <div className={cn('mb-5  flex items-center justify-between')}>
                  <h2 className="text-xl font-normal">
                    <span className="text-blue-6">
                      {
                        todayTableData?.data?.data.filter(
                          (row: any) => row.clockIn !== null
                        ).length
                      }
                    </span>
                    <span className="opacity-50">
                      /{todayTableData?.data?.data.length}
                    </span>{' '}
                    employees clocked in today
                  </h2>{' '}
                  <ViewRequests
                    placement="bottom"
                    modalView={
                      <Slider>
                        <RequestSlider />
                      </Slider>
                    }
                  />
                </div>
              </TodayTable>
            ) : (
              <TimesheetTable
                data={timesheetTableData?.data?.data}
                page="timesheet"
                startRangeDate={startRangeDate}
                endRangeDate={endRangeDate}
                //@ts-ignore
                setStartRangeDate={setStartRangeDate}
                //@ts-ignore

                setEndRangeDate={setEndRangeDate}
              >
                <div
                  className={cn(
                    'mb-5 flex w-full items-center justify-between'
                  )}
                >
                  <div className="flex items-center gap-1">
                    <div className="relative flex flex-col rounded-xl bg-blue-1 px-4 py-2.5 text-blue-6">
                      <div className="text-center text-base font-bold">
                        {totalRegular}
                      </div>
                      <div className="text-center text-[13px]">Regular</div>
                      <span className="absolute -right-[11px] top-1/2 z-10 flex h-[17px] w-[17px] -translate-y-1/2 items-center justify-center rounded-full bg-white">
                        <PlusIcon />
                      </span>
                    </div>
                    <div className="relative flex flex-col rounded-xl bg-peach-1 px-4 py-2.5 text-peach-6">
                      <div className="text-center text-base font-bold">
                        {paidTimeOff}
                      </div>
                      <div className=" text-center text-[13px]">
                        Paid time off
                      </div>
                      <span className="absolute -right-[11px] top-1/2 flex h-[17px] w-[17px] -translate-y-1/2 items-center justify-center rounded-full bg-white">
                        <EqualIcon />
                      </span>
                    </div>
                    <div className="flex  flex-col rounded-xl bg-blue-6 px-4 py-2.5 text-white">
                      <div className="text-center text-base font-bold">
                        {totalPaid}
                      </div>
                      <div className="text-center text-[13px]">
                        Total Paid Hours
                      </div>
                    </div>
                  </div>
                  <div className="flex  flex-col rounded-xl bg-brown-1 px-4 py-2.5 text-brown-6 ">
                    <div className="text-center text-base font-bold">
                      {unpaidTime}
                    </div>
                    <div className="text-center text-[13px]">
                      Unpaid time off
                    </div>
                  </div>
                </div>
              </TimesheetTable>
            )}
          </div>

          <MapContainer
            page={page}
            mapDate={mapDate}
            setMapDate={setMapDate}
            mapData={mapData?.data?.data?.result}
            mapLoading={mapLoading}
          />

          <div
            className={cn(
              'h-[520px] w-full overflow-hidden rounded-md border border-[#dcdcdc] px-5',
              page === 'timesheet' && 'hidden'
            )}
          >
            <h3 className="flex h-[70px] items-center border-b border-[#dcdcdc] text-lg font-normal text-primary">
              Activity
            </h3>
            <NothingDisplay
              className="mt-[120px] h-full "
              text="Your employees need to engage with your content"
            />
          </div>

          <JobsInsights page={page} jobsData={timesheetJobsData} />
        </div>
      </section>
    </>
  );
}
