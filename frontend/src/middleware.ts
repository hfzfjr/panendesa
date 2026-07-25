import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dashboard routes that require authentication
const protectedRoutes = ['/petani', '/kopdes', '/pembeli', '/admin'];

// Map path prefix to allowed roles
const pathRoleMap: Record<string, string[]> = {
  '/petani': ['petani'],
  '/kopdes': ['petugas_kopdes'],
  '/pembeli': ['pembeli'],
  '/admin': ['admin'],
};

// Map role to dashboard path
const roleDashboardMap: Record<string, string> = {
  petani: '/petani',
  petugas_kopdes: '/kopdes',
  pembeli: '/pembeli',
  admin: '/admin',
};

// Simple JWT decoder (no signature verification - for UI routing only)
// Backend still validates tokens for API requests
function decodeJWT(token: string): { role?: string; exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = Buffer.from(payload, 'base64url').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for access_token in cookie
    const token = request.cookies.get('access_token');

    if (!token) {
      // Redirect to login if no token found
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Decode token to get role
    const decoded = decodeJWT(token.value);

    if (!decoded || !decoded.role) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      // Token expired, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Find which path prefix this request matches
    const matchedPath = Object.keys(pathRoleMap).find(path => pathname.startsWith(path));

    if (matchedPath) {
      const allowedRoles = pathRoleMap[matchedPath];

      if (!allowedRoles.includes(decoded.role)) {
        // User doesn't have access to this path
        // Redirect to their own dashboard instead of login
        const userDashboard = roleDashboardMap[decoded.role] || '/';
        const redirectUrl = new URL(userDashboard, request.url);

        // Add a query param to show access denied message
        redirectUrl.searchParams.set('access_denied', 'true');

        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/petani/:path*', '/kopdes/:path*', '/pembeli/:path*', '/admin/:path*'],
};
