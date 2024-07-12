import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@/lib/utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // check if the user is authenticated
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        console.error(`error in middlware ${error}`);
        return false;
      }
    },
  });

  // if the user is authenticated or the request is for the home page, return the response
  if (authenticated || request.nextUrl.pathname === '/') {
    return response;
  }

  // if the user is not authenticated, redirect to the login page
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)',
    '/',
  ],
};
