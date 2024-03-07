import AttachmentIcon from '@/components/icons/attachment';
import CalenderIconSec from '@/components/icons/calender';
import CupIcon from '@/components/icons/cup';
import CustomizeIcon from '@/components/icons/customize-icon';
import DocumentIcon from '@/components/icons/document';
import FlatClock from '@/components/icons/flat-clock';
import GearIcon from '@/components/icons/gear-icon';
import GPSIcon from '@/components/icons/gps';
import HandIcon from '@/components/icons/hand';
import NotificationIcon from '@/components/icons/notification';
import SyncIcon from '@/components/icons/sync';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import React, { useEffect, useState } from 'react';
import { SettingsFormTypes, settingsSchema } from './settings-typs';
import { SubmitHandler, useWatch } from 'react-hook-form';
import General from './general/general';
import Customize from './customize/customize';
import Breaks from './breaks/breaks';
import Geolocation from './geolocation/geolocation';
import Reminders from './reminders/reminders';
import Notifications from './notifications/notification';
import ShiftAttachments from './shift-attachments/shift-attachments';
import Payroll from './payroll/payroll';
import Overtime from './overtime/overtime';
import { useGetSettings } from '@/app/api/time-clock/settings';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
const uniqueId1 = uuidv4();
const uniqueId2 = uuidv4();
const uniqueId3 = uuidv4();
const uniqueId4 = uuidv4();
const uniqueId5 = uuidv4();

const sidebar = [
  {
    id: 0,
    icon: <GearIcon />,
    title: 'general',
  },
  {
    id: 1,
    icon: <CustomizeIcon />,
    title: 'Customize',
  },
  {
    id: 2,
    icon: <CalenderIconSec />,
    title: 'Payroll',
  },
  {
    id: 3,
    icon: <FlatClock />,
    title: 'Overtime',
  },
  {
    id: 4,
    icon: <CupIcon dimensions="20" color="#203040" />,
    title: 'Breaks',
  },
  {
    id: 5,
    icon: <AttachmentIcon />,
    title: 'Shift attachment',
  },
  {
    id: 6,
    icon: <GPSIcon dimensions="20" color="#203040" />,
    title: 'Geolocation',
  },
  {
    id: 7,
    icon: <FlatClock />,
    title: 'Reminders',
  },
  {
    id: 8,
    icon: <NotificationIcon width="20" height="20" fill="#203040" />,
    title: 'Notifications',
  },
  {
    id: 9,
    icon: <DocumentIcon />,
    title: 'Auto reports',
  },
  {
    id: 10,
    icon: <HandIcon />,
    title: 'Limitations',
  },
  {
    id: 11,
    icon: <SyncIcon />,
    title: 'Integrations',
  },
];

export default function SettingSlider({ settings }: { settings?: any }) {
  const [activeForm, setActiveForm] = useState(0);
  const general = settings.data.data.general;
  const customize = settings.data.data.customize;
  const payroll = settings.data.data.payroll;
  const breaks = settings.data.data.breaks;
  const attachments = settings.data.data.attachments;
  const reminders = settings.data.data.reminders;
  const notifications = settings.data.data.notifications;

  const onSubmit: SubmitHandler<SettingsFormTypes> = (data) => {
    console.log(data);
  };

  const defaultValues = {
    general: {
      sunday: {
        isChecked: general.work_days.sunday.isChecked,
        hours: general.work_days.sunday.hours,
      },
      monday: {
        isChecked: general.work_days.monday.isChecked,
        hours: general.work_days.monday.hours,
      },
      tuesday: {
        isChecked: general.work_days.tuesday.isChecked,
        hours: general.work_days.tuesday.hours,
      },
      wednesday: {
        isChecked: general.work_days.wednesday.isChecked,
        hours: general.work_days.wednesday.hours,
      },
      thursday: {
        isChecked: general.work_days.thursday.isChecked,
        hours: general.work_days.thursday.hours,
      },
      friday: {
        isChecked: general.work_days.friday.isChecked,
        hours: general.work_days.friday.hours,
      },
      saturday: {
        isChecked: general.work_days.saturday.isChecked,
        hours: general.work_days.saturday.hours,
      },
      workFrom: '09:00',
      workTo: '17:00',
      dailyLimit: {
        isChecked: true,
        hours: '12 Hours',
      },
      autoClockOut: {
        isChecked: true,
        hours: '13 Hours',
      },
      diffScheduleWorked: {
        isChecked: general.diffScheduleWorked.isChecked,
      },
      workedLess: {
        isChecked: general.workedLess.isChecked,
        hours: general.workedLess.hours,
      },
      workedMore: {
        isChecked: general.workedMore.isChecked,
        hours: general.workedMore.hours,
      },
      timesheetLocking: general.timesheetLocking,
      showPayRate: general.showPayRate,
      timeFormat: 'Time (04:30)',
      timeZone: 'Africa/Cairo',
      canLockDays: ['Abdelrahman Saied 1'],
      canUnlockDays: ['Abdelrahman Saied 1'],
    },
    customize: {
      clockMobile: Boolean(customize.clockMobile),
      clockKiosk: Boolean(customize.clockKiosk),
      clockSchedule: Boolean(customize.clockSchedule),
      clockComputer: Boolean(customize.clockComputer),
      requestRecords: Boolean(customize.requestRecords),
      addShiftBreak: Boolean(customize.addShiftBreak),
      ediDeleteShiftBreak: Boolean(customize.ediDeleteShiftBreak),
      clockOutGeoFence: Boolean(customize.clockOutGeoFence),
    },
    payroll: {
      weekStarts: payroll.weekStarts,
      cycle: payroll.cycle,
      calender: new Date(payroll.calender),
      monthPeriod: payroll.monthPeriod,
      stPeriod: payroll.stPeriod,
      ndPeriod: payroll.ndPeriod,
      overnights: Boolean(payroll.overnights),
      remindUser: {
        isChecked: payroll.remindUser.isChecked,
        times: payroll.remindUser.times,
        period: payroll.remindUser.period,
        AB: payroll.remindUser.AB,
        time: payroll.remindUser.time,
        reminderText: payroll.remindUser.reminderText,
      },
      remindAdmin: {
        isChecked: payroll.remindAdmin.isChecked,
        times: payroll.remindAdmin.times,
        period: payroll.remindAdmin.period,
        AB: payroll.remindAdmin.AB,
        time: payroll.remindAdmin.time,
        reminderText: payroll.remindAdmin.reminderText,
      },
    },
    overtime: {
      weekly: {
        isChecked: false,
        startAfter: 40,
        baseWage: {
          type: 'X base wage',
          hours: 1.5,
        },
      },
      daily: {
        isChecked: false,
        dailyList: [
          {
            days: {
              sunday: false,
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: false,
            },
            startAfter: 8,
            baseWage: {
              type: 'X base wage',
              hours: 1.5,
            },
            id: 'id',
          },
        ],
      },
      partial: {
        isChecked: false,
        partialList: [
          {
            days: {
              sunday: false,
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: false,
            },
            between: '08:00',
            to: '11:00',
            baseWage: {
              type: 'X base wage',
              hours: 1.5,
            },
            id: 'id',
          },
        ],
      },
      consecutive: {
        isChecked: false,
        consecutiveList: [
          {
            startOn: 7,
            startAfter: 0,
            baseWage: {
              type: 'X base wage',
              hours: 1.5,
            },
            id: 'id',
          },
          {
            startOn: 7,
            startAfter: 8,
            baseWage: {
              type: 'X base wage',
              hours: 2,
            },
            id: 'id2',
          },
        ],
      },
      payPeriod: {
        isChecked: false,
        payPeriodList: [
          {
            startAfter: 40,
            baseWage: {
              type: 'X base wage',
              hours: 1.5,
            },
            id: 'id',
          },
        ],
      },
    },
    breaks: {
      chosen: 'disabled',
      manual: breaks.manual,
      automatic: [
        {
          duration: '30 minutes',
          hours: '7 hours',
          id: uniqueId3,
        },
      ],
    },
    attachments: [
      {
        isChecked: false,
        icon: 'write',
        text: 'I confirm my hours',
        type: 'Signature',
        shortCode: '',
        id: uniqueId4,
        list: [],
      },
      {
        isChecked: false,
        icon: 'plus',
        text: 'Image from route',
        type: 'Image attachment',
        shortCode: '',
        id: uniqueId5,
        list: [],
      },

      {
        isChecked: false,
        icon: 'customer',
        text: 'Omar',
        type: 'Dropdown list',
        shortCode: '',
        id: 'uniqueId5',
        list: [
          {
            isChecked: true,
            itemName: 'omar',
            shortCode: 'oamr 2',
            id: 'uniqueId',
            inEdit: false,
          },
          {
            isChecked: true,
            itemName: 'ahmed',
            shortCode: 'ahmed',
            id: 'uniqueId2',
            inEdit: false,
          },
        ],
      },
    ],
    geolocation: {
      geolocationName: 'Clock in & out',
      enableLocation: false,
      sites: [],
    },
    reminders: {
      sunday: reminders.sunday,
      monday: reminders.monday,
      tuesday: reminders.tuesday,
      wednesday: reminders.wednesday,
      thursday: reminders.thursday,
      friday: reminders.friday,
      saturday: reminders.saturday,
      clockIn: {
        isChecked: Boolean(reminders.clockIn.isChecked),
        time: reminders.clockIn.time,
      },
      clockOut: {
        isChecked: Boolean(reminders.clockOut.isChecked),
        time: reminders.clockOut.time,
      },
      dailyLimit: {
        isChecked: Boolean(reminders.dailyLimit.isChecked),
        hours: '12 Hours',
      },
    },
    notifications: {
      timeClockNot: true,
      addedNewShift: {
        mobile: Boolean(notifications.addedNewShift.mobile),
        web: Boolean(notifications.addedNewShift.web),
      },
      editedShift: {
        mobile: Boolean(notifications.editedShift.mobile),
        web: Boolean(notifications.editedShift.web),
      },
      exceedsLimit: {
        mobile: Boolean(notifications.exceedsLimit.mobile),
        web: Boolean(notifications.exceedsLimit.web),
        email: Boolean(notifications.exceedsLimit.email),
      },
      autoClocksOut: {
        mobile: Boolean(notifications.autoClocksOut.mobile),
        web: Boolean(notifications.autoClocksOut.web),
        email: Boolean(notifications.autoClocksOut.email),
      },
      requestApproval: {
        mobile: Boolean(notifications.requestApproval.mobile),
        web: Boolean(notifications.requestApproval.web),
        email: Boolean(notifications.requestApproval.email),
        requests: 5,
      },
      approvedDeclinedShift: {
        mobile: Boolean(notifications.approvedDeclinedShift.mobile),
        web: Boolean(notifications.approvedDeclinedShift.web),
      },
    },
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center gap-2 border-b border-gray-2 py-7 text-gray-6">
        <GearIcon /> Time Clock settings
      </div>

      <div className="grid grow grid-cols-[minmax(200px,max-content)_1fr] overflow-auto">
        <div className="relative z-10 h-full border-r border-gray-2">
          <ul className="fixed z-10 h-full min-w-[200px]  p-2">
            {sidebar.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveForm(item.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-xl p-2 transition duration-100 hover:bg-gray-1',
                  item.id === activeForm && 'bg-blue-1 hover:bg-blue-2'
                )}
              >
                {item.icon}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <Form<SettingsFormTypes>
          // resetValues={reset}
          validationSchema={settingsSchema}
          onSubmit={onSubmit}
          className="mx-auto w-[600px] @container"
          useFormProps={{
            mode: 'onChange',
            defaultValues,
          }}
          id="settings-task-form"
        >
          {({
            register,
            control,
            setValue,
            getValues,
            getFieldState,
            formState: { errors },
          }) => {
            const Watch = (name: keyof SettingsFormTypes) =>
              useWatch({
                control,
                name,
              });

            return (
              <div className="py-7">
                {activeForm === 0 ? (
                  <General
                    control={control}
                    watch={Watch}
                    setValue={setValue}
                    getValues={getValues}
                  />
                ) : activeForm === 1 ? (
                  <Customize control={control} />
                ) : activeForm === 2 ? (
                  <Payroll
                    control={control}
                    getValues={getValues}
                    setValue={setValue}
                    register={register}
                  />
                ) : activeForm === 3 ? (
                  <Overtime
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                  />
                ) : activeForm === 4 ? (
                  <Breaks
                    control={control}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                  />
                ) : activeForm === 5 ? (
                  <ShiftAttachments
                    control={control}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                  />
                ) : activeForm === 6 ? (
                  <Geolocation
                    register={register}
                    getValues={getValues}
                    control={control}
                    setValue={setValue}
                  />
                ) : activeForm === 7 ? (
                  <Reminders
                    control={control}
                    watch={Watch}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                  />
                ) : activeForm === 8 ? (
                  <Notifications
                    control={control}
                    watch={Watch}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                  />
                ) : (
                  ''
                )}
              </div>
            );
          }}
        </Form>
      </div>

      <div className="relative z-20 flex items-center justify-end border-t border-gray-2 p-7">
        <button
          form="settings-task-form"
          type="submit"
          className="h-10 rounded-full bg-blue-6 px-4 text-white transition duration-100 hover:bg-blue-5 active:bg-blue-7"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
