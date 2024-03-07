import Button from '@/app/(hydrogen)/shared/button';
import Calender from '@/app/(hydrogen)/shared/calender';
import Separator from '@/app/(hydrogen)/shared/separator';
import ActionInCalenderIcon from '@/components/icons/action-in-calender';
import React, {  useState } from 'react';
import { Popover } from 'rizzui';

export default function ChangeDate({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState<Date | undefined>(new Date(startDate));
  const [end, setEnd] = useState<Date | undefined>(new Date(endDate));

  const handleOnClick = () => {
    setIsOpen(false);
  };
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div className="grid grid-cols-1 rounded-2xl p-2 text-base">
          <div className="mb-2 grid grid-cols-[auto_1fr] items-center gap-2 p-2">
            <div className="contents  ">
              Start date <Calender date={start} setDate={setStart} />
            </div>
            <div className="contents">
              End date <Calender date={end} setDate={setEnd} minDate={start} />
            </div>
          </div>
          <Separator horizontal />
          <div className="mx-auto pt-2">
            <Button onClick={handleOnClick} variant="secondary">
              Set date
            </Button>
          </div>
        </div>
      )}
      shadow="sm"
      placement="bottom"
      className="z-[1000] rounded-2xl p-0 "
    >
      <div
        className="flex h-full cursor-pointer items-center justify-center gap-2"
      >
        <ActionInCalenderIcon /> Change Dates
      </div>
    </Popover>
  );
}
