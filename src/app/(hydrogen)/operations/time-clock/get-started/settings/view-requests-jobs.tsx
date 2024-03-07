'use client';
import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';
import GearIcon from '@/components/icons/gear-icon';
import cn from '@/utils/class-names';

interface ButtonProps {
  modalView: React.ReactNode;
  placement: DrawerPlacements;
  className?: string;
  title?: string;
}
export default function ViewRequestsJobs({
  placement,
  modalView,
  className,
  title,
}: ButtonProps) {
  const { openDrawer } = useDrawer();

  return (
    <button
      onClick={() =>
        openDrawer({
          view: modalView,
          placement,
          customSize: 'calc(100vh - 64px)',
        })
      }
      className={cn(
        ' h-10 rounded-full border bg-white px-4 text-[#ff9500] transition duration-100 hover:bg-gray-1 active:bg-gray-2',
        className
      )}
    >
      {title ? title : 'View requests'}
    </button>
  );
}
