import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

interface CompanyItem {
  displayValue: string;
  [key: string]: unknown;          // extra props from the API, still safely typed
}

interface ApiResponse {
  data: CompanyItem[];
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const apiKey  = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json(
      { error: 'API credentials not set' },
      { status: 500 },
    );
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
      },
    );

    const suggestions = res.data?.data?.map(
      (item) => item.displayValue,
    ) ?? [];

    return NextResponse.json({ suggestions });
  } catch (error: unknown) {
    /* ----------------------------- AXIOS ERRORS ---------------------------- */
    if (axios.isAxiosError(error)) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      return NextResponse.json(
        { error: axiosErr.response?.data?.message ?? axiosErr.message },
        { status: 500 },
      );
    }
    /* --------------------------- NON-AXIOS ERRORS -------------------------- */
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
