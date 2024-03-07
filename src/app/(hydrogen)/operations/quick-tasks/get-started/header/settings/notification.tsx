import React, { Fragment } from 'react';
import { Switch } from 'rizzui';

import mobileImg from '@public/notifications/mobilepush.webp';
import webImg from '@public/notifications/webpush.webp';
import Image from 'next/image';
import cn from '@/utils/class-names';
import { useWatch } from 'react-hook-form';
import { SettingsFormTypes } from './types';

const notification = {
  myTasksHeader: 'Notifications for my tasks',
  createdTasksHeader: 'Notifications for tasks that I created for others',
  icons: [
    {
      name: 'Mobile',
      image: mobileImg,
    },
    {
      name: 'Web push',
      image: webImg,
    },
  ],
  myTasks: [
    {
      title: 'A new task was assigned to me',
      formName: 'newTask',
    },
    {
      title: 'A task was edited',
      formName: 'editedTask',
    },
    {
      title: 'A task assigned to me is approaching its start time',
      formName: 'assignedToMe',
    },
    {
      title: 'A task assigned to me has past due time',
      formName: 'assignedPastToMe',
    },
  ],
  createdTasks: [
    {
      title: 'A user has completed a task',
      formName: 'completedTask',
    },
    {
      title: 'A user has viewed a task',
      formName: 'viewedTask',
    },
    {
      title: 'All sub-tasks were completed for a task',
      formName: 'subTasksCompleted',
    },
    {
      title: 'A task is approaching its start time',
      formName: 'taskStarted',
    },
    {
      title: "A task's due date has passed",
      formName: 'tasksPassed',
    },
    {
      title: 'A user added a comment on a task',
      formName: 'taskCommented',
    },
  ],
};

export default function Notifications({
  control,
  register,
  getValues,
  setValue,
}: any) {
  const Watch = (name: string) =>
    useWatch({
      control,
      name,
    });

  return (
    <div>
      <div className="mb-10 flex h-[90px] items-center justify-between rounded-xl bg-[#f4f4f4] p-5">
        <div>
          <p className="text-lg font-bold leading-normal">
            Tasks notifications
          </p>
          <p>
            You can manage all notifications in the{' '}
            <span className="cursor-pointer text-blue-6 hover:underline">
              notifications center
            </span>
          </p>
        </div>
        <Switch
          {...register('notifications.tasksNot')}
          className=" ring-transparent  "
        />
      </div>

      <div
        className={cn(
          'mb-8 grid grid-cols-[1fr_repeat(2,max-content)] gap-x-4 transition duration-100',
          !Watch('notifications.tasksNot') && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="self-center font-bold">
          {notification.myTasksHeader}
        </div>

        {notification.icons.map((icon) => (
          <div
            key={icon.name}
            className="flex flex-col place-content-between items-center gap-1"
          >
            <Image
              src={icon.image}
              alt={icon.name}
              className="max-h-[20px] max-w-[20px] object-contain"
            />
            <p className="text-[13px]">{icon.name}</p>
          </div>
        ))}

        <div className="col-span-3 h-px bg-[#dcdcdc]"></div>

        {notification.myTasks.map((item) => (
          <Fragment key={item.formName}>
            <div className="py-5">{item.title}</div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!Watch('notifications.tasksNot')}
                {...register(`notifications.${item.formName}.mobile`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!Watch('notifications.tasksNot')}
                {...register(`notifications.${item.formName}.web`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="col-span-3 h-px bg-[#dcdcdc] last-of-type:hidden"></div>
          </Fragment>
        ))}
      </div>

      <div
        className={cn(
          'mb-8 grid grid-cols-[1fr_repeat(2,max-content)] gap-x-4 transition duration-100',
          !Watch('notifications.tasksNot') &&
            'cursor-not-allowed opacity-50'
        )}
      >
        <div className="self-center font-bold">
          {notification.createdTasksHeader}
        </div>

        {notification.icons.map((icon) => (
          <div
            key={icon.name}
            className="flex flex-col place-content-between items-center gap-1"
          >
            <Image
              src={icon.image}
              alt={icon.name}
              className="max-h-[20px] max-w-[20px] object-contain"
            />
            <p className="text-[13px]">{icon.name}</p>
          </div>
        ))}

        <div className="col-span-3 h-px bg-[#dcdcdc]"></div>
        {notification.createdTasks.map((item) => (
          <Fragment key={item.formName}>
            <div className="py-5">{item.title}</div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!Watch('notifications.tasksNot')}
                {...register(`notifications.${item.formName}.mobile`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!Watch('notifications.tasksNot')}
                {...register(`notifications.${item.formName}.web`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="col-span-3 h-px bg-[#dcdcdc] last-of-type:hidden"></div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
