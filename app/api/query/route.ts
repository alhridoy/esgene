const API_ENDPOINT = process.env.RAG_API_URL;
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');
    const index_name = searchParams.get('index_name');

    const response = await fetch(
      `${API_ENDPOINT}/query?query=${query}&index_name=${index_name}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
