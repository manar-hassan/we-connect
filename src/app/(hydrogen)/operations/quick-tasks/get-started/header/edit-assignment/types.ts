import { z } from 'zod';

export const formSchema = z.object({
  howPublish: z.string(),
  smartGroups: z.array(z.string()),
  selectedUser: z.array(z.string()),
  notifyEmployees: z.object({
    isChecked: z.boolean(),
    message: z.string(),
  }),
  showBy: z.object({
    isChecked: z.boolean(),
    name: z.string(),
  }),
});


// generate form types from zod validation schema
export type FormTypes = z.infer<typeof formSchema>;

export const defaultValues = {
  howPublish: 'smart groups',
  smartGroups: ['all users group'],
  selectedUser: [],
  notifyEmployees: {
    isChecked: true,
    message: 'A new Update is waiting for you in the Stack18-1 app',
  },
  showBy: {
    isChecked: true,
    name: 'Abdelrahman Saied',
  },
};
