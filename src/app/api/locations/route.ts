import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type LocationItem = {
  displayValue: string;
  [key: string]: unknown;
};

type LocationApiResponse = {
  data: LocationItem[];
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { query }: { query: string } = await req.json();

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API credentials missing' }, { status: 500 });
  }

  try {
    const res = await axios.post<LocationApiResponse>(
      'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_geography_location_region_suggestions',
      { query },
      {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestions = res.data.data?.map((item) => item.displayValue) || [];
    return NextResponse.json({ suggestions });

  } catch (err) {
    const error = err as { response?: { data: unknown }; message: string };
    console.error('API request error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch region suggestions' }, { status: 500 });
  }
}
