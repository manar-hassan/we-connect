import React, { Fragment } from 'react';
import { Switch } from 'rizzui';

import mobileImg from '@public/notifications/mobilepush.webp';
import emailImg from '@public/notifications/email.webp';
import webImg from '@public/notifications/webpush.webp';
import Image from 'next/image';
import cn from '@/utils/class-names';

const notification = {
  usersHeader: 'Get notified when users:',
  adminsHeader: 'Get notified when admins:',
  icons: [
    {
      name: 'Mobile',
      image: mobileImg,
    },
    {
      name: 'Web push',
      image: webImg,
    },
    {
      name: 'Email',
      image: emailImg,
    },
  ],
  userData: [
    {
      title: 'Added a new shift',
      formName: 'addedNewShift',
      emailAvailable: false,
    },
    {
      title: 'Edited a shift',
      formName: 'editedShift',
      emailAvailable: false,
    },
    {
      title: 'Exceeds work hour limit',
      formName: 'exceedsLimit',
      emailAvailable: true,
    },
    {
      title: 'Auto clocks out',
      formName: 'autoClocksOut',
      emailAvailable: true,
    },
    {
      title: 'Requests are pending approval',
      formName: 'requestApproval',
      emailAvailable: true,
      inputField: true,
    },
  ],
  adminData: [
    {
      title: 'Approved/declined a shift',
      formName: 'approvedDeclinedShift',
      emailAvailable: false,
    },
  ],
};

export default function Notifications({
  control,
  watch,
  setValue,
  getValues,
  register,
}: {
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
  register: any;
}) {
  return (
    <div>
      <div className="mb-10 flex h-[90px] items-center justify-between rounded-xl bg-[#f4f4f4] p-5">
        <div>
          <p className="text-lg font-bold leading-normal">
            Time clock notifications
          </p>
          <p>
            You can manage all notifications in the{' '}
            <span className="cursor-pointer text-blue-6 hover:underline">
              notifications center
            </span>
          </p>
        </div>
        <Switch
          {...register('notifications.timeClockNot')}
          className=" ring-transparent  "
        />
      </div>

      <div
        className={cn(
          'mb-8 grid grid-cols-[1fr_repeat(3,max-content)] gap-x-4 transition duration-100',
          !watch('notifications.timeClockNot') &&
            'cursor-not-allowed opacity-50'
        )}
      >
        <div className="self-center font-bold">{notification.usersHeader}</div>

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

        <div className="col-span-4 h-px bg-[#dcdcdc]"></div>

        {notification.userData.map((item) => (
          <Fragment key={item.formName}>
            <div className="py-5">
              {item.inputField ? (
                <div className="flex items-center gap-3">
                  <input
                    disabled={!watch('notifications.timeClockNot')}
                    {...register(`notifications.${item.formName}.requests`, {
                      setValueAs: (value: string) => parseInt(value), 
                    })}
                    type="number"
                    className="flex h-10 w-14 items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                  />
                  <div>{item.title}</div>
                </div>
              ) : (
                item.title
              )}
            </div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!watch('notifications.timeClockNot')}
                {...register(`notifications.${item.formName}.mobile`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!watch('notifications.timeClockNot')}
                {...register(`notifications.${item.formName}.web`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="flex items-center justify-center">
              {item.emailAvailable ? (
                <Switch
                  disabled={!watch('notifications.timeClockNot')}
                  {...register(`notifications.${item.formName}.email`)}
                  className=" ring-transparent  "
                />
              ) : (
                '--'
              )}
            </div>
            <div className="col-span-4 h-px bg-[#dcdcdc] last-of-type:hidden"></div>
          </Fragment>
        ))}
      </div>

      <div
        className={cn(
          'mb-8 grid grid-cols-[1fr_repeat(3,max-content)] gap-x-4 transition duration-100',
          !watch('notifications.timeClockNot') &&
            'cursor-not-allowed opacity-50'
        )}
      >
        <div className="self-center font-bold">{notification.adminsHeader}</div>

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

        <div className="col-span-4 h-px bg-[#dcdcdc]"></div>
        {notification.adminData.map((item) => (
          <Fragment key={item.formName}>
            <div className="py-5">{item.title}</div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!watch('notifications.timeClockNot')}
                {...register(`notifications.${item.formName}.mobile`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="flex items-center justify-center">
              <Switch
                disabled={!watch('notifications.timeClockNot')}
                {...register(`notifications.${item.formName}.web`)}
                className=" ring-transparent  "
              />
            </div>
            <div className="flex items-center justify-center">
              {item.emailAvailable ? (
                <Switch
                  disabled={!watch('notifications.timeClockNot')}
                  {...register(`notifications.${item.formName}.email`)}
                  className=" ring-transparent  "
                />
              ) : (
                '--'
              )}
            </div>
            <div className="col-span-4 h-px bg-[#dcdcdc] last-of-type:hidden"></div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
