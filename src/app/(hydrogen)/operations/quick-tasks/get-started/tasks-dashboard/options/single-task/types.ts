import { z } from 'zod';

export const taskSchema = z.object({
  taskTitle: z.string().min(1),
  description: z.string(),
  assignTo: z.array(z.string()).refine((data) => data.length > 0),
  taskDistribution: z.string(),
  location: z.string(),
  frequency: z.string(),
  start: z.object({
    date: z.date().nullable(),
    time: z.string(),
  }),
  end: z.object({
    date: z.date().nullable(),
    time: z.string(),
  }),
  recStart: z.date(),
  recFreq: z.string(),
  recEvery: z.number(),
  recTime: z.string(),
  recEndStatus: z.string(),
  recTasks: z.number(),
  recNotify: z.boolean(),
  recDue: z.object({
    count: z.number(),
    time: z.string(),
  }),
  labels: z
    .object({
      title: z.string(),
      color: z.string(),
    })
    .array(),
  subTasks: z.array(z.string()),
});

export type TaskFormType = z.infer<typeof taskSchema>;

export const defaultValues = {
  taskTitle: '',
  description: '',
  assignTo: [''],
  taskDistribution: 'group',
  location: '',
  frequency: 'one-off',
  start: {
    date: null,
    time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`,
  },
  end: {
    date: null,
    time: `${(new Date().getHours() + 1)
      .toString()
      .padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`,
  },
  recStart: new Date(),
  recFreq: 'daily',
  recEvery: 1,
  recTime: `${new Date().getHours().toString().padStart(2, '0')}:${new Date()
    .getMinutes()
    .toString()
    .padStart(2, '0')}`,
  recEndStatus: 'after',
  recTasks: 5,
  recNotify: false,
  recDue: {
    count: 60,
    time: 'minutes',
  },
  labels: [],
  subTasks: [],
};
