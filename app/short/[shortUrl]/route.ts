import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';
import { isValidUrl } from '@/app/utils/isValidUrl';
import normalizeUrl from 'normalize-url';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const GET = async (req: NextRequest, { params }) => {
  // Associate urlRef to shortUrl
  const shortUrl = params.urlRef;
  const url = new URL(req.url);
  const doc = await db.url.findFirst({
    where: { shortUrl },
  });
  if (doc && doc.fullUrl) {
    if (isValidUrl(doc.fullUrl)) {
      const fqUrl = normalizeUrl(doc.fullUrl, { defaultProtocol: 'https' });
      return NextResponse.redirect(new URL(fqUrl));
    }
  }
  console.log('No valid URL - Redirect home');
  return NextResponse.redirect(url.origin);
};
