'use server';
import db from '@/app/utils/db';
import { revalidatePath } from 'next/cache';
import short from 'short-uuid';
import { hasProtocol, isValidUrl } from './isValidUrl';
import normalizeUrl from 'normalize-url';

export const getData = async () => {
  const urls = await db.url.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return urls;
};

export const newUrl = async (fullUrl: string) => {
  if (fullUrl.length === 0) return;
  if (!hasProtocol(fullUrl)) {
    fullUrl = `https://${fullUrl}`;
  }
  if (isValidUrl(fullUrl)) {
    fullUrl = normalizeUrl(fullUrl, {
      removeTrailingSlash: true,
    });
    fullUrl = new URL(fullUrl).href;
    console.log(fullUrl);
    const shortUrl = short.generate().slice(0, 7);
    try {
      const entry = await db.url.create({
        data: {
          fullUrl,
          shortUrl,
        },
      });
      return entry;
    } catch (e) {
      console.log(e);
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
