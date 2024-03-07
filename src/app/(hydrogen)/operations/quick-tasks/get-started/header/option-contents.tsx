import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import SettingsSlider from './settings/settings-slider';
import EditAssignmentSlider from './edit-assignment/edit-assingment-slider';
const Slider = dynamic(() => import('@/app/(hydrogen)/shared/slider'), {
  ssr: false,
});

export default function OptionContents() {
  const { openDrawer } = useDrawer();

  const handleOpenSettings = () => {
    openDrawer({
      view: (
        <Slider>
          <SettingsSlider />
        </Slider>
      ),
      placement: 'bottom',
      customSize: 'calc(100vh - 64px)',
    });
  };

  const handleOpenAssignment = () => {
    openDrawer({
      view: (
        <Slider>
          <EditAssignmentSlider />
        </Slider>
      ),
      placement: 'bottom',
      customSize: 'calc(100vh - 64px)',
    });
  };
  return (
    <ul className=" max-h-[220px] w-full overflow-auto">
      <li
        onClick={handleOpenSettings}
        className="cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left text-primary transition duration-100 hover:bg-gray-1"
      >
        Settings
      </li>
      <li
        onClick={handleOpenAssignment}
        className="cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left text-primary transition duration-100 hover:bg-gray-1"
      >
        Edit assignments
      </li>
      <li className="cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left text-primary transition duration-100 hover:bg-gray-1">
        Archive Quick Tasks
      </li>
      <li className="cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left text-primary transition duration-100 hover:bg-gray-1">
        Delete Quick Tasks
      </li>
    </ul>
  );
}
