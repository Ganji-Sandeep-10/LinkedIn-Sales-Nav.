import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = body.query || 'a';

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API credentials missing' }, { status: 500 });
  }

  const options = {
    method: 'POST',
    url: 'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_job_title_suggestions',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
      'Content-Type': 'application/json',
    },
    data: { query },
  };

  try {
    const response = await axios.request(options);
    const titles = (response.data.data || []).map((item: any) => item.displayValue);
    return NextResponse.json({ suggestions: titles });
  } catch (error: any) {
    console.error('API call error:', error?.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch job titles' }, { status: 500 });
  }
}
