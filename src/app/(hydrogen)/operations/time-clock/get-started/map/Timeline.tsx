'use client';
import UserCard from '@/app/(hydrogen)/shared/user-card';
import ArrowDown from '@/components/icons/arrow-down';
import GPSIconSec from '@/components/icons/gps-sec';
import X from '@/components/icons/x';
import { useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

export default function Timeline({
  user,
  setShowTimeline,
  addresses,
}: {
  user: any;
  setShowTimeline: React.Dispatch<React.SetStateAction<boolean>>;
  addresses: string[];
}) {
  const handleCloseTimeline = () => {
    setShowTimeline(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-5 p-5">
        <button onClick={handleCloseTimeline}>
          <X />
        </button>
        <UserCard
          name={user.name}
          imageSrc={user.image_url}
          phoneNumber="00"
        />
        <div className="-ml-2.5">{user.name}</div>
      </div>
      <div className=" flex-1 overflow-auto bg-[#f4f4f4] px-5">
        {user.attendances.map((attendance: any, index: number) => {
          return (
            <div
              key={index}
              className="border-l-2 border-[#2998ff33] pb-4 pt-2.5"
            >
              <div className=" flex items-center gap-1">
                {index === 0 ? (
                  <ArrowDown className="-ml-[11px] scale-150 stroke-[#f4f4f4] text-blue-6" />
                ) : (
                  <div className="-ml-1.5 h-2.5 w-2.5 rounded-full border border-[#f4f4f4] bg-blue-6"></div>
                )}
                <span className="text-sm font-bold">{attendance.time}</span>
              </div>
              <div className="mx-[7px] mt-2.5 rounded-xl bg-white">
                <div className="flex items-center justify-between gap-2.5 border-b  border-[#e9e9e9] px-2.5 py-[5px]">
                  <div className="whitespace-nowrap">{attendance.type}</div>
                  <div
                    style={{ backgroundColor: `${attendance.color}` }}
                    className="truncate rounded-full px-3 leading-[26px] text-white"
                  >
                    {attendance.project}
                  </div>
                </div>
                <div className="flex min-h-[30px] items-center justify-between px-2.5">
                  <div>
                    <GPSIconSec />
                  </div>
                  <div className="ml-2.5 truncate">{addresses[index]}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
