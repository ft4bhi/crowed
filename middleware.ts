import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, PUBLIC_ROUTES } from '@/lib/firebase/constants';

// Routes that require authentication
const PROTECTED_ROUTES = ['/sell', '/settings', '/profile'];

export function middleware(request: NextRequest) {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const { pathname } = request.nextUrl;

    // If user has session and tries to access login/signup → redirect to home
    if (session && PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user has NO session and tries to access protected routes → redirect to login
    if (!session && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/signup', '/sell', '/sell/:path*', '/settings', '/settings/:path*', '/profile', '/profile/:path*'],
};
