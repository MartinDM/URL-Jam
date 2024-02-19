import { z } from 'zod';

export const ValidEntry = z.object({
  fullUrl: z.string().url(),
  shorturl: z.string().uuid(),
  clicks: z.number(),
  id: z.string(),
});

export const hasProtocol = (url: string) => {
  return url.indexOf('http://') == 0 || url.indexOf('https://') == 0;
};

export const ValidInput = z.string().min(1, { message: 'Enter a URL' });

export const ValidUrl = z.string().url({ message: 'Invalid URL' });

export type ValidUrl = z.infer<typeof ValidUrl>;
export type ValidInput = z.infer<typeof ValidInput>;
export type ValidEntry = z.infer<typeof ValidEntry>;
