import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  const res = await axios.post(
    'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_geography_location_region_suggestions',
    { query },
    {
      headers: {
        'x-rapidapi-key': '64c824edb0msh3a8874c4b32af44p13c465jsn6594f857b5e3',
        'x-rapidapi-host': 'linkedin-sales-navigator-no-cookies-required.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    }
  );

  const suggestions = res.data.data?.map((item: any) => item.displayValue) || [];
  return NextResponse.json({ suggestions });
}
