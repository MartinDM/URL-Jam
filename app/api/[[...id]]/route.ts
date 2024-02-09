import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';

import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
  console.log('get run');
  const urls = await db.url.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return NextResponse.json(urls);
}
