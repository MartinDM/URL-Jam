'use server';
import db from '@/app/utils/db';
import { revalidatePath } from 'next/cache';

import short from 'short-uuid';

export const newUrl = async (formData) => {
  const fullUrl = formData.get('fullUrl') as string;
  await db.url.create({
    data: {
      fullUrl,
      shortUrl: short.generate(),
    },
  });
  revalidatePath('/');
};
