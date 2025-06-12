import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type JobTitleItem = {
  displayValue: string;
  [key: string]: unknown;
};

type ApiResponse = {
  data: JobTitleItem[];
};

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API credentials missing' }, { status: 500 });
  }

  try {
    const response = await axios.post<ApiResponse>(
      'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_job_title_suggestions',
      { query },
      {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
          'Content-Type': 'application/json',
        },
      }
    );

    const titles = response.data?.data?.map(item => item.displayValue) || [];
    return NextResponse.json({ suggestions: titles });

  } catch (error) {
    console.error('API call error:', (error as any)?.response?.data || (error as Error).message);
    return NextResponse.json({ error: 'Failed to fetch job titles' }, { status: 500 });
  }
}
