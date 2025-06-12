import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = body.query || 'a';

  const options = {
    method: 'POST',
    url: 'https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_job_title_suggestions',
    headers: {
      'x-rapidapi-key': '64c824edb0msh3a8874c4b32af44p13c465jsn6594f857b5e3',
      'x-rapidapi-host': 'linkedin-sales-navigator-no-cookies-required.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: { query },
  };

  try {
    const response = await axios.request(options);
    const titles = (response.data.data || []).map((item: any) => item.displayValue);
    return NextResponse.json({ suggestions: titles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
