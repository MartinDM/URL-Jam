import { NextResponse } from 'next/server';
import db from '@/app/utils/db';

export async function GET(req: Request) {
  const urls = await db.url.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return NextResponse.json(urls);
}
