import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type CompanyItem = {
  displayValue: string;
  [key: string]: unknown;
};

type ApiResponse = {
  data: CompanyItem[];
};

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API credentials not set' }, { status: 500 });
  }

  try {
    const res = await axios.post<ApiResponse>(
      'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_company_suggestions',
      { query },
      {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestions = res.data?.data?.map(item => item.displayValue) || [];
    return NextResponse.json({ suggestions });

  } catch (error) {
    console.error('API Error:', (error as any)?.response?.data || (error as Error).message);
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
