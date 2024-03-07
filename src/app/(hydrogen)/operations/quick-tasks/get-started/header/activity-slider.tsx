'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import X from '@/components/icons/x';
import Image from 'next/image';
import iconTask from '@public/quick-tasks/Icon_task_manage.png';
import UserCard from '@/app/(hydrogen)/shared/user-card';
const SideSlider = dynamic(
  () => import('@/app/(hydrogen)/shared/side-slider'),
  {
    ssr: false,
  }
);

export default function ActivitySlider({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const activityLogs = [
    {
      date: '22/01',
      list: [
        {
          time: '07:76',
          user: {
            name: 'Omar Taha',
            isAdmin: true,
            phoneNumber: '01276412078',
            imageSrc:
              'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
            isAuthenticated: true,
            profileLink: '#',
            chatLink: '#',
          },
          activity: 'sent a reminder for the task',
          taskTitle: 'title 1',
          place: 'task management',
        },
        {
          time: '07:45',
          user: {
            name: 'Omar Taha',
            isAdmin: true,
            phoneNumber: '01276412078',
            imageSrc:
              'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
            isAuthenticated: true,
            profileLink: '#',
            chatLink: '#',
          },
          activity: 'sent a reminder for the task',
          taskTitle: 'test',
          place: 'task management',
        },
        {
          time: '07:44',
          user: {
            name: 'Omar Taha',
            isAdmin: true,
            phoneNumber: '01276412078',
            imageSrc:
              'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
            isAuthenticated: true,
            profileLink: '#',
            chatLink: '#',
          },
          activity: 'created a task',
          taskTitle: 'test',
          place: 'task management',
        },
      ],
    },
    {
      date: '21/01',
      list: [
        {
          time: '11:53',
          user: {
            name: 'Omar Taha',
            isAdmin: true,
            phoneNumber: '01276412078',
            imageSrc:
              'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
            isAuthenticated: true,
            profileLink: '#',
            chatLink: '#',
          },
          activity: 'created a task',
          taskTitle: 'title 7',
          place: 'task management',
        },
        {
          time: '11:34',
          user: {
            name: 'Omar Taha',
            isAdmin: true,
            phoneNumber: '01276412078',
            imageSrc:
              'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
            isAuthenticated: true,
            profileLink: '#',
            chatLink: '#',
          },
          activity: 'archived the task ',
          taskTitle: 'test',
          place: 'task management',
        },
        {
          time: '09:39',
          user: {
            name: 'Omar Taha',
            isAdmin: true,
            phoneNumber: '01276412078',
            imageSrc:
              'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
            isAuthenticated: true,
            profileLink: '#',
            chatLink: '#',
          },
          activity: 'edited task',
          taskTitle: 'test',
          place: 'task management',
        },
      ],
    },
  ];

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <SideSlider isOpen={isOpen} onClose={handleCloseDrawer}>
      <div className="flex h-full flex-col ">
        <div className="flex min-h-max items-center gap-2 border-b border-gray-2 p-4 text-gray-6">
          <span onClick={handleCloseDrawer} className="cursor-pointer">
            <X />
          </span>
          <div className="flex items-center gap-1">Activity log</div>
        </div>
        <div className="flex-1 overflow-auto p-8">
          {activityLogs.map((day, index) => (
            <div key={index} className="relative">
              <div className="h-[26px] w-[76px] bg-[#ececec] text-center text-[13px] leading-[26px]">
                {day.date}
              </div>
              <div className="absolute left-[74px] top-0 z-0 h-full w-0.5 bg-[#ececec]"></div>
              <div className="pb-10">
                {day.list.map((activity, index) => (
                  <div key={index} className="relative mt-10 flex items-center">
                    <div className="text-[#3f4648]shrink-0 w-full max-w-[75px] ">
                      {activity.time}
                    </div>
                    <div className="-ml-[3.5px] h-[7px] w-[7px] shrink-0 rounded-full bg-blue-6"></div>
                    <div className="ml-10 flex items-center ">
                      <div className="shrink-0 rounded-full border border-blue-6">
                        <Image
                          src={iconTask}
                          alt="icon task"
                          width={34}
                          height={34}
                        />
                      </div>
                      <div className="ml-2.5 shrink-0">
                        <UserCard
                          name={activity.user.name}
                          isAdmin={activity.user.isAdmin}
                          phoneNumber={activity.user.phoneNumber}
                          imageSrc={activity.user.imageSrc}
                        />
                      </div>
                      <div className="ml-5 inline-block align-middle ">
                        <p>
                          <span>{activity.user.name}</span>{' '}
                          <b>{activity.activity}</b> -{' '}
                          <span>{activity.taskTitle}</span> in the{' '}
                          <span className="capitalize text-blue-6">
                            {activity.place}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>{' '}
    </SideSlider>
  );
}
