import { z } from 'zod';

const daySchema = z.object({
  isChecked: z.boolean().optional(),
  hours: z.number().optional(),
});

const settingGeneralSchema = z.object({
  sunday: daySchema,
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  workFrom: z.string().optional(),
  workTo: z.string().optional(),
  dailyLimit: z.object({
    isChecked: z.boolean().optional(),
    hours: z.string().optional(),
  }),
  autoClockOut: z.object({
    isChecked: z.boolean().optional(),
    hours: z.string().optional(),
  }),
  diffScheduleWorked: z.object({
    isChecked: z.boolean().optional(),
  }),
  workedLess: z.object({
    isChecked: z.boolean().optional(),
    hours: z.number().optional(),
  }),
  workedMore: z.object({
    isChecked: z.boolean().optional(),
    hours: z.number().optional(),
  }),
  timesheetLocking: z.boolean().optional(),
  canLockDays: z.string().array().optional(),
  canUnlockDays: z.string().array().optional(),
  showPayRate: z.string().optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
});

const customizeSchema = z.object({
  clockMobile: z.boolean().optional(),
  clockKiosk: z.boolean().optional(),
  clockSchedule: z.boolean().optional(),
  clockComputer: z.boolean().optional(),
  requestRecords: z.boolean().optional(),
  addShiftBreak: z.boolean().optional(),
  ediDeleteShiftBreak: z.boolean().optional(),
  clockOutGeoFence: z.boolean().optional(),
});

const payrollSchema = z.object({
  weekStarts: z.string().optional(),
  cycle: z.string().optional(),
  calender: z.date().optional(),
  monthPeriod: z.string().optional(),
  stPeriod: z.string().optional(),
  ndPeriod: z.string().optional(),
  overnights: z.boolean().optional(),
  remindUser: z
    .object({
      isChecked: z.boolean().optional(),
      times: z.number().optional(),
      period: z.string().optional(),
      AB: z.string().optional(),
      time: z.string().optional(),
      reminderText: z.string().optional(),
    })
    .optional(),
  remindAdmin: z
    .object({
      isChecked: z.boolean().optional(),
      times: z.number().optional(),
      period: z.string().optional(),
      AB: z.string().optional(),
      time: z.string().optional(),
      reminderText: z.string().optional(),
    })
    .optional(),
});

const overtimeSchema = z.object({
  weekly: z
    .object({
      isChecked: z.boolean().optional(),
      startAfter: z.number().optional(),
      baseWage: z
        .object({
          type: z.string().optional(),
          hours: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  daily: z
    .object({
      isChecked: z.boolean().optional(),
      dailyList: z
        .object({
          days: z
            .object({
              sunday: z.boolean().optional(),
              monday: z.boolean().optional(),
              tuesday: z.boolean().optional(),
              wednesday: z.boolean().optional(),
              thursday: z.boolean().optional(),
              friday: z.boolean().optional(),
              saturday: z.boolean().optional(),
            })
            .optional(),
          startAfter: z.number().optional(),
          baseWage: z
            .object({
              type: z.string().optional(),
              hours: z.number().optional(),
            })
            .optional(),
          id: z.string().optional(),
        })
        .array()
        .optional(),
    })
    .optional(),
  partial: z
    .object({
      isChecked: z.boolean().optional(),
      partialList: z
        .object({
          days: z
            .object({
              sunday: z.boolean().optional(),
              monday: z.boolean().optional(),
              tuesday: z.boolean().optional(),
              wednesday: z.boolean().optional(),
              thursday: z.boolean().optional(),
              friday: z.boolean().optional(),
              saturday: z.boolean().optional(),
            })
            .optional(),
          between: z.string().optional(),
          to: z.string().optional(),
          baseWage: z
            .object({
              type: z.string().optional(),
              hours: z.number().optional(),
            })
            .optional(),
          id: z.string().optional(),
        })
        .array()
        .optional(),
    })
    .optional(),
  consecutive: z
    .object({
      isChecked: z.boolean().optional(),
      consecutiveList: z
        .object({
          startOn: z.number().optional(),
          startAfter: z.number().optional(),
          baseWage: z
            .object({
              type: z.string().optional(),
              hours: z.number().optional(),
            })
            .optional(),
          id: z.string().optional(),
        })
        .array()
        .optional(),
    })
    .optional(),
  payPeriod: z
    .object({
      isChecked: z.boolean().optional(),
      payPeriodList: z
        .object({
          startAfter: z.number().optional(),
          baseWage: z
            .object({
              type: z.string().optional(),
              hours: z.number().optional(),
            })
            .optional(),
          id: z.string().optional(),
        })
        .array()
        .optional(),
    })
    .optional(),
});

const breaksSchema = z.object({
  chosen: z.string().optional(),
  manual: z
    .object({
      breakName: z.string().optional(),
      type: z.string().optional(),
      duration: z.string().optional(),
      id: z.string().optional(),
    })
    .array(),
  automatic: z
    .object({
      duration: z.string().optional(),
      hours: z.string().optional(),
      id: z.string().optional(),
    })
    .array(),
});

const attachmentsSchema = z
  .object({
    isChecked: z.boolean().optional(),
    icon: z.string().optional(),
    text: z.string({
      required_error: 'Shift attachment name must not be empty',
    }),
    type: z.string().optional(),
    shortCode: z.string().optional(),
    
    list: z
      .object({
        isChecked: z.boolean().optional(),
        itemName: z.string().optional(),
        shortCode: z.string().optional(),
        id: z.string().optional(),
        inEdit: z.boolean().optional(),
      })

      .array(),
    id: z.string().optional(),
  })
  .array();

const geolocationSchema = z.object({
  geolocationName: z.string().optional(),
  enableLocation: z.boolean().optional(),
  sites: z
    .object({
      siteName: z.string().optional(),
      siteAddress: z
        .object({
          name: z.string().optional(),
          lat: z.number().optional(),
          lng: z.number().optional(),
        })
        .optional(),
      fence: z.number().optional(),
      availableJobs: z.string().array().optional(),
      isChecked: z.boolean().optional(),
    })
    .array()
    .optional(),
});

const remindersSchema = z.object({
  sunday: z.boolean().optional(),
  monday: z.boolean().optional(),
  tuesday: z.boolean().optional(),
  wednesday: z.boolean().optional(),
  thursday: z.boolean().optional(),
  friday: z.boolean().optional(),
  saturday: z.boolean().optional(),
  clockIn: z.object({
    isChecked: z.boolean().optional(),
    time: z.string().optional(),
  }),
  clockOut: z.object({
    isChecked: z.boolean().optional(),
    time: z.string().optional(),
  }),
  dailyLimit: z.object({
    isChecked: z.boolean().optional(),
    hours: z.string().optional(),
  }),
});

const notificationSchema = z.object({
  timeClockNot: z.boolean().optional(),
  addedNewShift: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  editedShift: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  exceedsLimit: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
      email: z.boolean().optional(),
    })
    .optional(),
  autoClocksOut: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
      email: z.boolean().optional(),
    })
    .optional(),
  requestApproval: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
      email: z.boolean().optional(),
      requests: z.number().optional(),
    })
    .optional(),
  approvedDeclinedShift: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
});

export const settingsSchema = z.object({
  general: settingGeneralSchema,
  customize: customizeSchema,
  payroll: payrollSchema,
  overtime: overtimeSchema,
  breaks: breaksSchema,
  geolocation: geolocationSchema,
  reminders: remindersSchema,
  notifications: notificationSchema,
  attachments: attachmentsSchema,
});

// generate form types from zod validation schema
export type SettingsFormTypes = z.infer<typeof settingsSchema>;

/* export const defaultValues = {
  general: {
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
    timeFormat: 'Time (04:30)',
    timeZone: 'Africa/Cairo',
    canLockDays: ['Abdelrahman Saied 1'],
    canUnlockDays: ['Abdelrahman Saied 1'],
  },
  customize: {
    clockMobile: true,
    clockKiosk: true,
    clockSchedule: true,
    clockComputer: true,
    requestRecords: true,
    addShiftBreak: true,
    ediDeleteShiftBreak: true,
    clockOutGeoFence: true,
  },
  payroll: {
    weekStarts: 'Sunday',
    cycle: 'No predefined cycle',
    calender: new Date(),
    monthPeriod: '1st',
    stPeriod: '1st',
    ndPeriod: 'Last day of month',
    overnights: false,
    remindUser: {
      isChecked: false,
      times: 1,
      period: 'Days',
      AB: 'After',
      time: '09:00',
      reminderText: 'Please review your work hours in the timesheet today!',
    },
    remindAdmin: {
      isChecked: false,
      times: 1,
      period: 'Days',
      AB: 'After',
      time: '09:00',
      reminderText: 'Please review your work hours in the timesheet today!',
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
    manual: [
      {
        breakName: 'Lunch break',
        type: 'Paid',
        duration: '30 minutes',
        uniqueId: uniqueId1,
      },
      {
        breakName: 'Rest Break',
        type: 'Unpaid',
        duration: '15 minutes',
        uniqueId: uniqueId2,
      },
    ],
    automatic: [
      {
        duration: '30 minutes',
        hours: '7 hours',
        uniqueId: uniqueId3,
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
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    clockIn: {
      isChecked: true,
      time: '09:00',
    },
    clockOut: {
      isChecked: true,
      time: '17:00',
    },
    dailyLimit: {
      isChecked: false,
      hours: '12 Hours',
    },
  },
  notifications: {
    timeClockNot: true,
    addedNewShift: {
      mobile: true,
      web: true,
    },
    editedShift: {
      mobile: true,
      web: true,
    },
    exceedsLimit: {
      mobile: true,
      web: true,
      email: true,
    },
    autoClocksOut: {
      mobile: true,
      web: true,
      email: true,
    },
    requestApproval: {
      mobile: true,
      web: true,
      email: true,
      requests: '5',
    },
    approvedDeclinedShift: {
      mobile: true,
      web: true,
    },
  },
};
 */