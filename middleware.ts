import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith('/studio')) return NextResponse.next();

  const hasAccessToken = Boolean(
    request.cookies.get('sb-access-token')?.value ||
      request.cookies.get('sb:token')?.value ||
      request.cookies.get('supabase-auth-token')?.value,
  );

  if (hasAccessToken) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/studio/:path*'],
};

