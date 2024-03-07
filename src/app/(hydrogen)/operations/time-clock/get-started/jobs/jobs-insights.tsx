import cn from '@/utils/class-names';
import React from 'react';
import dynamic from 'next/dynamic';
import JobsSlider from './jobs-slider';
import ViewRequestsJobs from '../settings/view-requests-jobs';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
const Slider = dynamic(() => import('@/app/(hydrogen)/shared/slider'), {
  ssr: false,
});

export default function JobsInsights({
  page,
  jobsData,
}: {
  page: string;
  jobsData: any;
}) {
  const jobs = jobsData.data.data.attendances;
  const { openDrawer } = useDrawer();

  return (
    <div
      className={cn(
        'flex h-[500px] flex-col rounded-md border border-[#dcdcdc] ',
        page === 'today' && 'hidden'
      )}
    >
      <div className=" flex min-h-[64px] items-center justify-between border-b border-[#dcdcdc] px-5">
        <h3 className="text-lg font-normal">Job insights</h3>
        <ViewRequestsJobs
          placement="bottom"
          title="View all jobs"
          className="text-blue-6"
          modalView={
            <Slider>
              <JobsSlider jobsData={jobsData.data?.data?.attendances} />
            </Slider>
          }
        />
      </div>
      <div className="grid w-full grid-cols-[1fr_repeat(3,max-content)] overflow-y-auto px-5 pt-6">
        <div className=" contents ">
          <div className="sticky top-0 bg-[#f8f8f8] px-2.5 text-center leading-[50px] text-[#7f8689] before:absolute before:inset-0 before:block before:h-6 before:-translate-y-6 before:bg-white before:content-['']">
            Job
          </div>
          <div className="sticky top-0 bg-[#f8f8f8] px-2.5 text-center leading-[50px] text-[#7f8689] before:absolute before:inset-0 before:block before:h-6 before:-translate-y-6 before:bg-white before:content-['']">
            Total hours
          </div>
          <div className="sticky top-0 bg-[#f8f8f8] px-2.5 text-center leading-[50px] text-[#7f8689] before:absolute before:inset-0 before:block before:h-6 before:-translate-y-6 before:bg-white before:content-['']">
            Avg hours per shift
          </div>
          <div className="sticky top-0 bg-[#f8f8f8] px-2.5 text-center leading-[50px] text-[#7f8689] before:absolute before:inset-0 before:block before:h-6 before:-translate-y-6 before:bg-white before:content-['']"></div>
        </div>
        {jobs.map((item: any, index: number) => (
          <div key={index} className="row contents">
            <div
              onClick={() =>
                openDrawer({
                  view: (
                    <Slider>
                      <JobsSlider
                        jobsData={[jobsData.data?.data?.attendances[index]]}
                      />
                    </Slider>
                  ),
                  placement: 'bottom',
                  customSize: 'calc(100vh - 64px)',
                })
              }
              className="flex h-12 cursor-pointer items-center gap-2.5 border-b border-b-[#d9d9d9] pl-2 "
            >
              <span
                style={{ backgroundColor: item.color }}
                className={`block h-2.5 w-2.5 rounded-full`}
              ></span>
              {item.job}
            </div>
            <div className="flex h-12 items-center justify-center gap-2.5 border-b border-b-[#d9d9d9] pl-2 ">
              {item.totalHours === '00:00' ? '--' : item.totalHours}
            </div>
            <div className="flex h-12 items-center justify-center gap-2.5 border-b border-b-[#d9d9d9] pl-2 ">
              {item.avg_hours === '00:00' ? '--' : item.avg_hours}
            </div>
            <div className="flex h-12 items-center justify-center gap-2.5 border-b border-b-[#d9d9d9] pl-2 "></div>
          </div>
        ))}
      </div>
    </div>
  );
}
