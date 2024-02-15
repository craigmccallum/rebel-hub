import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

/**
 * Custom zod schemas
 */
export const zc = {
  dayjs: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date - expected a dayjs instance'),
};

export const formatZodError = (zodError: z.ZodError) =>
  `\n${zodError.issues.map((issue) => `- ${issue.path.join('.')} (${issue.message})`).join('\n')}`;
