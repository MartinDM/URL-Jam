'use server';
import db from '@/app/utils/db';
import { revalidatePath } from 'next/cache';
import short from 'short-uuid';
import { hasProtocol, isValidUrl } from './isValidUrl';
import normalizeUrl from 'normalize-url';

export const deleteUrl = async (id) => {
  console.log('delete');
  await db.url.delete({
    where: { id },
  });
  revalidatePath('/');
};

export const newUrl = async (formData) => {
  let fullUrl = formData.get('fullUrl') as string;
  if (fullUrl.length === 0) return;
  if (!hasProtocol(fullUrl)) {
    fullUrl = `https://${fullUrl}`;
  }
  if (isValidUrl(fullUrl)) {
    fullUrl = normalizeUrl(fullUrl, {
      defaultProtocol: 'https',
      removeTrailingSlash: true,
    });
    fullUrl = new URL(fullUrl).href;
    await db.url.create({
      data: {
        fullUrl,
        shortUrl: short.generate().slice(0, 7),
      },
    });
    revalidatePath('/');
  } else {
    return console.log('invalid', fullUrl);
  }
};
