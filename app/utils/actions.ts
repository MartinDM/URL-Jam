'use server';
import db from '@/app/utils/db';
import short from 'short-uuid';
import { ValidUrl } from './validations';
export const getData = async () => {
  const urls = await db.url.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return urls;
};

export const newUrl = (fullUrl: string) => {
  const isValidUrl = ValidUrl.safeParse(fullUrl);
  if (isValidUrl.success) {
    const shortUrl = short.generate().slice(0, 7);
    // TODO: Implement click count
    const clicks = 0;
    const entry = db.url.create({
      data: {
        fullUrl,
        shortUrl,
        clicks,
      },
    });
    return entry;
  } else {
    return console.error(isValidUrl.error.issues[0].message);
  }
};

export const deleteUrl = async (id: string) => {
  try {
    await db.url.delete({
      where: { id },
    });
    //revalidatePath('/');
  } catch (e) {
    console.error(e);
  }
};
