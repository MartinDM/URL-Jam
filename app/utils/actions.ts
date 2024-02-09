'use server';
import db from '@/app/utils/db';
import { revalidatePath } from 'next/cache';
import short from 'short-uuid';
import { hasProtocol, isValidUrl } from './isValidUrl';
import normalizeUrl from 'normalize-url';

export const newUrl = async (formData: FormData) => {
  let fullUrl = formData.get('fullUrl') as string;
  if (fullUrl.length === 0) return;
  if (!hasProtocol(fullUrl)) {
    fullUrl = `https://${fullUrl}`;
  }
  if (isValidUrl(fullUrl)) {
    fullUrl = new URL(fullUrl).href;
    console.log(fullUrl);
    fullUrl = normalizeUrl(fullUrl, {
      removeTrailingSlash: true,
    });
    const shortUrl = short.generate().slice(0, 7);
    try {
      await db.url.create({
        data: {
          fullUrl,
          shortUrl,
        },
      });
      revalidatePath('/');
    } catch (e) {
      return console.error(e.message);
    }
  } else {
    return console.error('invalid', fullUrl);
  }
};

export const deleteUrl = async (id: string) => {
  try {
    await db.url.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (e) {
    console.error(e);
  }
};
