import { NextResponse, NextRequest } from 'next/server';
import db from '@/app/utils/db';

import { revalidatePath } from 'next/cache';
