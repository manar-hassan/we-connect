import { Badge } from '@/components/ui/badge';

import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';

import TalkToExpertDropdown from './talk-expert';
import Expert from '@/components/icons/expert';
import HelpDropdown from './help';
import Messages from '@/components/icons/messages';
import Accessability from '@/components/icons/accessability';
import NotificationIcon from '@/components/icons/notification';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 place-content-center items-center justify-end gap-4 text-gray-700">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-secondary">
          Free trial ends in 6 days
        </span>
        <button className="h-10 rounded-full bg-purple-6 px-4 text-white transition duration-100 hover:bg-purple-5 active:bg-purple-7">
          Upgrade
        </button>
      </div>
      <div className=" mx-auto h-10 w-px bg-gray-200"></div>
      <TalkToExpertDropdown>
        <div className=" text-blue-6 hover:text-blue-5 active:text-blue-7 flex cursor-pointer items-center gap-2 ">
          <Expert /> Talk to an expert
        </div>
      </TalkToExpertDropdown>
      <div className=" mx-auto h-10 w-px bg-gray-200"></div>
      <HelpDropdown />
      <div className=" mx-auto h-10 w-px bg-gray-200"></div>
      <div className="title-hover after:content-['Accessibility_options']">
        <Accessability />
      </div>
      <div className="title-hover after:content-['Chat']">
        <Messages />
        <Badge
          renderAsDot
          color="success"
          enableOutlineRing
          className="absolute right-0 top-0 "
        />
      </div>
      <NotificationDropdown>
        <div className="title-hover after:content-['Notifications']">
          <NotificationIcon />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-0 top-0"
          />
        </div>
      </NotificationDropdown>
      <div className=" mx-auto h-10 w-px bg-gray-200"></div>
      <ProfileMenu />
    </div>
  );
}
