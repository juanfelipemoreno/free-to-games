import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/catalogo', '/wishlist', '/game']
const publicRoutes = ['/login', '/']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth_token')?.value

  // Las rutas protegidas requieren autenticación
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Si está autenticado y va a /login, redirige al catálogo
  if (pathname === '/login' && token) {
    const catalogUrl = new URL('/catalogo', request.url)
    return NextResponse.redirect(catalogUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)']
}
