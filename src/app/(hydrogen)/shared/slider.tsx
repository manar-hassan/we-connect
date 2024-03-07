'use client';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import ArrowDownSecIcon from '@/components/icons/arrow-down-sec';

export default function Slider({ children }: { children?: React.ReactNode }) {
  const { closeDrawer } = useDrawer();

  return (
    <div className="h-full w-full">
      <div
        onClick={() => closeDrawer()}
        className="absolute -top-[32px] left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center gap-2 text-white"
      >
        <ArrowDownSecIcon /> Close
      </div>
      {children}
    </div>
  );
}
