import { NextResponse, type NextRequest } from "next/server";

/*
  URLs are lowercase everywhere. /Clients, /About-Us, /INDIA/Pune… redirect (308) to the
  lowercase page instead of showing a 404.
*/
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname !== lower) {
    const url = req.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Pages only — skip Next internals, the API and anything with a file extension.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
