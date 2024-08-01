import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    
    // Allow access to the home page
    if (url.pathname === '/') {
      return NextResponse.next();
    }

    // Redirect to login page if the user is not authenticated
    if (!req.nextauth.token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Continue to the requested page
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login', // Redirect to this page if the user is not authenticated
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to home page without authentication
        if (req.nextUrl.pathname === '/') {
          return true;
        }
        // Protect all other routes when no token
        return !!token;
      },
    },
  }
)

// Config for middleware to match all paths except for api, _next, login, and signup pages
export const config = { matcher: ['/((?!api|_next|login|signup).*)'] }