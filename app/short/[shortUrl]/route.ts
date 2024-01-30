import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';
import { isValidUrl } from '@/app/utils/isValidUrl';
import normalizeUrl from 'normalize-url';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const GET = async (req: NextRequest, { params }) => {
  // Associate urlRef to shortUrl
  const shortUrl = params.shortUrl;
  const doc = await db.url.findFirst({
    where: { shortUrl },
  });
  console.log(doc);
  if (doc && doc.fullUrl) {
    if (isValidUrl(doc.fullUrl)) {
      console.log(doc.fullUrl);
      return NextResponse.redirect(doc.fullUrl);
    }
  }
  console.log('No valid URL - Redirect home');
  return NextResponse.redirect(new URL(req.url).origin);
};
