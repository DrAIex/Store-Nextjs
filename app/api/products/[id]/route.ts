import { NextResponse } from 'next/server';
import { products } from '@/app/data/products';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse('Invalid product ID', { status: 400 });
    }

    const product = await products.find(p => p.url === id);
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 