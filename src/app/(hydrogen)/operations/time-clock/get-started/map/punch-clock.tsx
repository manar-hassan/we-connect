'user client';

import React, { useEffect, useState } from 'react';
import SearchIconSec from '@/components/icons/search-second';
import OnRouteIcon from '@/components/icons/on-route';
import MapWithoutActivities from '@/components/icons/map-without-activities';
import UserCard from '@/app/(hydrogen)/shared/user-card';
import { Tooltip } from 'rizzui';
import Timeline from './Timeline';
import cn from '@/utils/class-names';

export default function PunchClock({
  allUsers,
  setAllUsers,
  user,
  setUser,
  addresses,
}: {
  allUsers: any[];
  setAllUsers: React.Dispatch<React.SetStateAction<any[]>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  addresses: string[];
}) {
  const [showTimeline, setShowTimeline] = useState(false);

  const handleOpenTimeline = (index: number) => {
    setShowTimeline(true);
    /*     setUser(allUsers.filter((user)=>user.id === user.id))
     */ setUser(allUsers[index]);
  };

  const handleToggleAllUsers = (checked: boolean) => {
    setAllUsers((prev) => {
      return prev.map((user) => {
        return {
          ...user,
          hideMarker: checked,
        };
      });
    });
  };

  const handleToggleUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: any
  ) => {
    e.stopPropagation();
    setAllUsers((prev) => {
      return prev.map((user) => {
        if (user.id === user.id) {
          return {
            ...user,
            hideMarker: !user.hideMarker,
          };
        } else {
          return user;
        }
      });
    });
  };

  const checkIfAnyUserHideMarkup = () => {
    return allUsers.some((user) => user.hideMarker);
  };

  useEffect(() => {
    setShowTimeline(false);
  }, [allUsers]);

  return (
    <div className="relative ml-4 mt-4 flex h-[524px] w-[330px] flex-col overflow-hidden rounded-xl bg-white shadow-ct-shadow-2  ">
      {showTimeline ? (
        <Timeline
          user={user}
          setShowTimeline={setShowTimeline}
          addresses={addresses}
        />
      ) : (
        <>
          <h3 className="p-5 text-[15px] font-bold">
            All users that clocked in today
          </h3>
          <div className="mb-2 flex items-center justify-between gap-2.5 px-2.5">
            <div className="flex h-9 items-center justify-between rounded-full border px-2.5">
              <input
                type="text"
                placeholder="Search"
                className="w-full border-none p-0 placeholder:text-sm focus:border-none focus:ring-transparent"
              />
              <SearchIconSec />
            </div>
            <label
              htmlFor="toggleAllUsers"
              className={cn(
                'flex h-9 w-[75px] cursor-pointer items-center justify-evenly rounded-full bg-blue-6 font-bold text-[17bx] text-white transition duration-100 hover:bg-blue-5 active:bg-blue-7',
                checkIfAnyUserHideMarkup() &&
                  'bg-blue-1 text-blue-6 hover:bg-blue-1'
              )}
            >
              <OnRouteIcon flip={checkIfAnyUserHideMarkup()} /> All
              <input
                type="checkbox"
                onChange={(e) => handleToggleAllUsers(e.target.checked)}
                id="toggleAllUsers"
                className="hidden"
              />
            </label>
          </div>
          {allUsers.length > 0 && allUsers[0].attendances.length > 0 ? (
            <>
              {allUsers.map((user: any, index: number) => (
                <Tooltip
                  tooltipArrowClassName="[&>path]:fill-gray-10"
                  className="relative rounded-md bg-gray-10 p-2 text-sm"
                  key={user.id}
                  content={() => 'View route'}
                  placement="right"
                >
                  <div
                    onClick={() => handleOpenTimeline(index)}
                    key={user.id}
                    className="relative mb-1 grid min-h-[40px] cursor-pointer grid-flow-col grid-cols-[1fr_3fr_3fr_1fr_10px] items-center  gap-1 border-b px-4 py-2.5 hover:bg-[#f1f1f1]"
                  >
                    <UserCard
                      imageSrc={user.image_url}
                      name={user.name}
                      phoneNumber="00"
                      size="sm"
                    />
                    <div>{user.name}</div>
                    <div
                      style={{ background: `${user.attendances[0].color}` }}
                      className="h-7 truncate rounded-full px-3 text-center leading-[27px] text-white"
                    >
                      {user.attendances[0].project}
                    </div>
                    <button
                      onClick={(e) => handleToggleUser(e, user)}
                      className={cn(
                        'relative flex h-[30px] w-[30px] items-center justify-center justify-self-center rounded-full bg-blue-6',
                        user.hideMarker && 'bg-blue-1 hover:bg-blue-1 '
                      )}
                    >
                      <OnRouteIcon
                        className="absolute"
                        flip={false || user.hideMarker}
                      />
                    </button>
                    <div className="h-2.5 w-2.5 rotate-45 border-e border-t border-[#9e9e9e]"></div>
                  </div>
                </Tooltip>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center px-8 pt-16 text-center">
              <MapWithoutActivities />
              <h3 className="pb-1.5 pt-4 text-base font-bold">
                No activity tracked today
              </h3>
              <p>
                Once users start clocking in today you will see their activity
                here
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
