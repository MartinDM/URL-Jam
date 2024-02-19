import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';
export const GET = async (req: NextRequest, { params }) => {
  // Associate urlRef to shortUrl
  const shortUrl = params.shortUrl;
  const doc = await db.url.findFirst({
    where: { shortUrl },
  });
  if (doc && doc.fullUrl) {
    return NextResponse.redirect(doc.fullUrl);
  }
  console.log('No valid URL - Redirect home');
  return NextResponse.redirect(new URL(req.url).origin);
};
