import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type JobTitleItem = {
  displayValue: string;
  [key: string]: unknown;
};

type JobTitleApiResponse = {
  data: JobTitleItem[];
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { query }: { query: string } = await req.json();

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API credentials missing' }, { status: 500 });
  }

  try {
    const response = await axios.post<JobTitleApiResponse>(
      'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_job_title_suggestions',
      { query: query || 'a' },
      {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestions = response.data.data?.map(item => item.displayValue) || [];
    return NextResponse.json({ suggestions });

  } catch (err) {
    const error = err as { response?: { data: unknown }; message: string };
    console.error('API Error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch job titles' }, { status: 500 });
  }
}
