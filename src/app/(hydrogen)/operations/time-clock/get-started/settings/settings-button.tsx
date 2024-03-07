'use client';
import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';
import GearIcon from '@/components/icons/gear-icon';

interface ButtonProps {
  modalView: React.ReactNode;
  placement: DrawerPlacements;
}

export default function Settings({ placement, modalView }: ButtonProps) {
  const { openDrawer } = useDrawer();
  return (
    <button
      className="flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-blue-5 transition duration-100 hover:bg-gray-1 active:bg-gray-2"
      onClick={() =>
        openDrawer({
          view: modalView,
          placement,
          customSize: 'calc(100vh - 64px)',
        })
      }
    >
      <GearIcon />
      Settings
    </button>
  );
}
