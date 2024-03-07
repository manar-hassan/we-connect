import { permissions } from './../../../../../../shared/roles-permissions/utils';
import { z } from 'zod';

const daySchema = z.object({
  isChecked: z.boolean().optional(),
  hours: z.number().optional(),
});

const settingGeneralSchema = z.object({
  permissions: z.string(),
  onlyUsersSelected: z.string().array(),
  allUsersSelected: z.string().array(),
  due: z.object({
    number: z.number(),
    time: z.string(),
  }),
  weekStarts: z.string(),
});

const notificationSchema = z.object({
  tasksNot: z.boolean().optional(),
  newTask: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  editedTask: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  assignedToMe: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  assignedPastToMe: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  completedTask: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  viewedTask: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  subTasksCompleted: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  taskStarted: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  tasksPassed: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
  taskCommented: z
    .object({
      mobile: z.boolean().optional(),
      web: z.boolean().optional(),
    })
    .optional(),
});

export const settingsSchema = z.object({
  general: settingGeneralSchema,
  notifications: notificationSchema,
});

export type SettingsFormTypes = z.infer<typeof settingsSchema>;

export const defaultValues = {
  general: {
    permissions: 'only admins',
    onlyUsersSelected: [''],
    allUsersSelected: [''],
    due: {
      number: 60,
      time: 'minutes',
    },
    weekStarts: 'sunday',
  },
  notifications: {
    tasksNot: true,
    newTask: {
      mobile: true,
      web: true,
    },
    editedTask: {
      mobile: true,
      web: true,
    },
    assignedToMe: {
      mobile: true,
      web: true,
    },
    assignedPastToMe: {
      mobile: true,
      web: true,
    },
    completedTask: {
      mobile: true,
      web: true,
    },
    viewedTask: {
      mobile: true,
      web: true,
    },
    subTasksCompleted: {
      mobile: true,
      web: true,
    },
    taskStarted: {
      mobile: true,
      web: true,
    },
    tasksPassed: {
      mobile: true,
      web: true,
    },
    taskCommented: {
      mobile: true,
      web: true,
    },
  },
};
