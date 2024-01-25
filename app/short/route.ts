import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  console.log(req.url);
  const longUrl = await db.url.findMany({});
  return NextResponse.json({ data: longUrl });
};
