import Separator from '@/app/(hydrogen)/shared/separator';
import CheckInsideCircle from '@/components/icons/check-inside-circle';
import ReminderIcon from '@/components/icons/reminder';
import ChangeDate from './change-date';

export default function MainActions({ task }: any) {
  const handleOnReminderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).classList.add(
      'text-[#4ab61b]',
      '[&>div]:rotate-45'
    );
  };
  const handleOnMarkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).classList.add(
      'text-[#4ab61b]',
      '[&>svg>g]:fill-[#4ab61b]',
      '[&>svg>g]:stroke-white'
    );
  };
  return (
    <div className="grid h-[65px] grid-cols-[1fr_2px_1fr_2px_1fr] items-center justify-between">
      <div
        onClick={handleOnReminderClick}
        className="flex h-full cursor-pointer items-center justify-center gap-2 "
      >
        <div className='transition duration-100'>
          <ReminderIcon />
        </div>
        Send reminder
      </div>
      <Separator height="100%" />
      <ChangeDate startDate={task.startDate} endDate={task.endDate} />
      <Separator height="100%" />
      <div
        onClick={handleOnMarkClick}
        className="flex h-full cursor-pointer items-center justify-center gap-2"
      >
        <CheckInsideCircle /> Mark as done
      </div>
    </div>
  );
}
