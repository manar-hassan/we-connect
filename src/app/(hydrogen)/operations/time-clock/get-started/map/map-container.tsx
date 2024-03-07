'user client';

import React, { useState } from 'react';
import AllActivity from '../all-activity';
import AllJobs from '../all-jobs';
import Calender from '../../../../shared/calender';
import MapIndicator from './map-indicator';
import cn from '@/utils/class-names';
import Map from './map';
import Loading from '@/app/(hydrogen)/shared/loading';

export default function MapContainer({
  page,
  mapDate,
  setMapDate,
  mapData,
  mapLoading,
}: {
  page: string;
  mapDate: Date | undefined;
  setMapDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  mapData: any[];
  mapLoading: boolean;
}) {
  const [activeJob, setActiveJob] = useState({
    id: 0,
    project_name: 'All jobs',
  });
  const [activity, setActivity] = useState('All activity');

  return (
    <div
      className={cn(
        'mb-8 h-[650px] overflow-hidden rounded-md border border-[#dcdcdc]',
        page === 'timesheet' && 'hidden'
      )}
    >
      <div className="flex h-20 items-center justify-between border-b border-[#dcdcdc] p-5">
        <div className="flex items-center justify-start gap-4 text-base ">
          <AllActivity activeButton={activity} setActiveButton={setActivity} />
          <div className=" mx-auto h-10 w-px bg-gray-200"></div>
          Jobs:{' '}
          <AllJobs activeButton={activeJob} setActiveButton={setActiveJob} />
          <div className=" mx-auto h-10 w-px bg-gray-200"></div>
          <Calender date={mapDate} setDate={setMapDate} maxDate={new Date()} />
          <button
            onClick={() => setMapDate(new Date())}
            className=" h-10 rounded-full border bg-white px-4 text-blue-6 transition duration-100 hover:bg-gray-1 active:bg-gray-2"
          >
            Today
          </button>
        </div>
        <MapIndicator />
      </div>

      <div className="h-full w-full">
        {mapLoading ? (
          <div className="flex h-[80%] w-full items-center justify-center">
            <Loading />
          </div>
        ) : (
          <Map mapData={mapData} activity={activity} job={activeJob.project_name} />
        )}
      </div>
    </div>
  );
}
