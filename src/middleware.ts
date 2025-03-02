import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isLoginPage = request.nextUrl.pathname === '/';
  const isProtectedRoute = ['/step-one', '/step-two'].includes(request.nextUrl.pathname);


  if (!token && isProtectedRoute) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }


  if (token && isLoginPage) {
    const url = new URL('/step-one', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/step-one', '/step-two']
};