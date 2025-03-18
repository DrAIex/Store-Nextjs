import { NextResponse } from 'next/server';
import { products } from '@/app/data/products';

export async function GET() {
  try {
    if (!products) {
      return new NextResponse('Products data not found', { status: 404 });
    }
    return NextResponse.json({ products });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 