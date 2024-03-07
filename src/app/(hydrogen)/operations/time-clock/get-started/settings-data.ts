const data = {
  attachments: [
    {
      isChecked: true,
      icon: 'https://example.com/photos.zip',
      text: 'Image_atteachment',
      type: 'Image_attachment',
      shortCode: null,
      id: 1,
      list: [],
    },
    {
      isChecked: true,
      icon: 'https://example.com/invoice.png',
      text: 'Invoice',
      type: 'Dropdown_list',
      shortCode: 'INV_001',
      id: 2,
      list: [
        {
          isChecked: true,
          itemName: 'Option 1',
          shortCode: 'OPT_1',
        },
        {
          isChecked: true,
          itemName: 'Option 2',
          shortCode: 'OPT_2',
        },
        {
          isChecked: true,
          itemName: 'Option 3',
          shortCode: 'OPT_3',
        },
      ],
    },
  ],
  breaks: [
    {
      chosen: 'manual',
      manual: [
        {
          breakName: 'coffie break',
          duration: 30,
          type: 'Paid',
          uniqueId: 1,
        },
        {
          breakName: 'Break2',
          duration: 30,
          type: 'Paid',
          uniqueId: 3,
        },
        {
          breakName: 'Break3',
          duration: 30,
          type: 'Unpaid',
          uniqueId: 4,
        },
        {
          breakName: 'Break4',
          duration: 30,
          type: 'Paid',
          uniqueId: 5,
        },
        {
          breakName: 'Break5',
          duration: 30,
          type: 'Unpaid',
          uniqueId: 6,
        },
        {
          breakName: 'Break6',
          duration: 30,
          type: 'Paid',
          uniqueId: 7,
        },
        {
          breakName: 'Break7',
          duration: 30,
          type: 'Unpaid',
          uniqueId: 8,
        },
      ],
    },
  ],
  reminders: {
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: false,
    saturday: false,
    clockIn: {
      isChecked: '1',
      time: '09:00:00',
    },
    clockOut: {
      isChecked: '1',
      time: '17:00:00',
    },
    dailyLimit: {
      isChecked: '1',
      hours: '12:00:00',
    },
  },
  notifications: {
    addedNewShift: {
      status: 1,
      mobile: 1,
      web: 1,
    },
    editedShift: {
      status: 1,
      mobile: 1,
      web: 1,
    },
    exceedsLimit: {
      status: 1,
      mobile: 1,
      web: 1,
      email: 1,
    },
    autoClocksOut: {
      status: 1,
      mobile: 1,
      web: 1,
      email: 1,
    },
    requestApproval: {
      status: 1,
      mobile: 1,
      web: 1,
      email: 1,
      requests_count: 3,
    },
    approvedDeclinedShift: {
      status: 1,
      mobile: 1,
      web: 1,
    },
  },
  customize: {
    clockMobile: 1,
    clockKiosk: 1,
    clockSchedule: 1,
    clockComputer: 1,
    requestRecords: 1,
    addShiftBreak: 1,
    ediDeleteShiftBreak: 1,
    clockOutGeoFence: 1,
  },
  general: {
    work_days: {
      sunday: {
        isChecked: true,
        hours: 8,
      },
      monday: {
        isChecked: true,
        hours: 8,
      },
      tuesday: {
        isChecked: true,
        hours: 8,
      },
      wednesday: {
        isChecked: true,
        hours: 8,
      },
      thursday: {
        isChecked: true,
        hours: 8,
      },
      friday: {
        isChecked: true,
        hours: 8,
      },
      saturday: {
        isChecked: true,
        hours: 8,
      },
    },
    default_work_hours: null,
    dailyLimit: null,
    autoClockOut: null,
    diffScheduleWorked: {
      isChecked: true,
    },
    workedLess: {
      isChecked: false,
      hours: 0,
    },
    workedMore: {
      isChecked: true,
      hours: 10,
    },
    timesheetLocking: true,
    showPayRate: 'Disabled',
    timeFormat: null,
    timeZone: null,
    canLockDays: [1, 2],
    canUnlockDays: [1, 2],
  },
  payroll: {
    weekStarts: 'Sunday',
    cycle: 'No predefined cycle',
    calender: '2023-12-23 10:48:39',
    monthPeriod: '1st',
    stPeriod: '1st',
    ndPeriod: 'Last day of month',
    overnights: 0,
    remindUser: [
      {
        isChecked: false,
        times: 1,
        period: 'Days',
        AB: 'After',
        time: '09:00',
        reminderText: 'Please review your work hours in the timesheet today!',
      },
    ],
    remindAdmin: [
      {
        isChecked: false,
        times: 1,
        period: 'Days',
        AB: 'After',
        time: '09:00',
        reminderText: 'Please review your work hours in the timesheet today!',
      },
    ],
  },
};
