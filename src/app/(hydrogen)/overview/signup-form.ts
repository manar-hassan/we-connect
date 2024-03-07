import { PhoneNumber } from '@/components/ui/phone-input';
import { z } from 'zod';

const fileSchema = z.object({
  name: z.string(),
  lastModified: z.number(),
  lastModifiedDate: z.date(),
  size: z.number(),
  type: z.string(),
  webkitRelativePath: z.string(),
});

export const formsSchema = z.object({
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  employees: z.string().optional(),
  businessIndustry: z.string().optional(),
  operations: z
    .object({
      time: z.boolean().optional(),
      schedule: z.boolean().optional(),
      forms: z.boolean().optional(),
      task: z.boolean().optional(),
    })
    .optional(),
  communication: z
    .object({
      chat: z.boolean().optional(),
      directory: z.boolean().optional(),
      events: z.boolean().optional(),
      knowledge: z.boolean().optional(),
    })
    .optional(),
  hr: z
    .object({
      time: z.boolean().optional(),
      training: z.boolean().optional(),
      document: z.boolean().optional(),
      recognition: z.boolean().optional(),
    })
    .optional(),
  logo: z.instanceof(File).array().optional(),

  phoneNumber: z.string().optional(),
  countryCode: z.string().optional(),
});

export const defaultValues = {
  companyName: '',
  jobTitle: '',
  employees: '',
  businessIndustry: '',
  operations: {
    time: false,
    schedule: false,
    forms: false,
    task: false,
  },
  communication: {
    chat: false,
    directory: false,
    events: false,
    knowledge: false,
  },
  hr: {
    time: false,
    training: false,
    document: false,
    recognition: false,
  },
  logo: undefined,
  phoneNumber: undefined,
  countryCode: undefined,
};

export type formsType = z.infer<typeof formsSchema>;
