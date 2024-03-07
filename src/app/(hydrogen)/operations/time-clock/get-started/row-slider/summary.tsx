import EqualIcon from '@/components/icons/equal';
import PlusIcon from '@/components/icons/plus';
import React from 'react';

export default function Summary({
  isLoading,
  regular,
}: {
  isLoading: boolean;
  regular: string;
}) {
  const TimeCalc = ({ time, title }: { time: string; title: string }) => (
    <div className="flex flex-col items-start">
      <div className="text-xs font-bold text-secondary">
        {isLoading ? '--:--' : time}
      </div>
      <div className="text-xs text-secondary">{title}</div>
    </div>
  );
  return (
    <div className="flex items-center justify-between px-6 py-5">
      <div className="flex items-center">
        <TimeCalc time={regular} title="Regular" />
        <div className="m-2 flex h-4 w-4 items-center justify-center text-gray-6">
          <PlusIcon />
        </div>
        <TimeCalc time="00:00" title="Paid time off" />
        <div className="m-2 flex h-4 w-4 items-center justify-center text-gray-6">
          <EqualIcon fill="#8b939c" />
        </div>
        <TimeCalc time={regular} title="Total Paid Hours" />
        <div className="mx-4 h-11 w-px bg-gray-2"></div>
        <TimeCalc time="00:00" title="Unpaid time off" />
      </div>
      <div className="flex items-center gap-4">
        <TimeCalc time="--:--" title="Total difference" />
        <TimeCalc time="00:00" title="Pay per dates" />
      </div>
    </div>
  );
}
