import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API credentials are missing' }, { status: 500 });
  }

  try {
    const res = await axios.post(
      'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_years_in',
      { query },
      {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestions = res.data.data?.map((item: any) => item.displayValue) || [];
    return NextResponse.json({ suggestions });

  } catch (error: any) {
    console.error('API Error:', error?.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
