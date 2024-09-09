import { updateSession } from "@v1/supabase/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@v1/supabase/client";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(
    request,
    I18nMiddleware(request),
  );

  // Check if the user has completed their profile
  if (user && !request.nextUrl.pathname.startsWith('/profile')) {
    const { data: profile } = await createClient().from('users').select('full_name').eq('id', user.id).single();
    if (!profile?.full_name) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  if (!request.nextUrl.pathname.endsWith("/login") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
