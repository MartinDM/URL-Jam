import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';

import { revalidatePath } from 'next/cache';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const url = new URL(req.url);
  const id = params.id;
  await db.url.delete({
    where: { id },
  });
  revalidatePath('/');
  return NextResponse.redirect(url.origin);
};
