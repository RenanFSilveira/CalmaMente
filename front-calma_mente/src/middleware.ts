// middleware.ts (Versão Minimalista Funcional)

import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecretKey } from '@/lib/secrets'; 

const PUBLIC_PATHS = ['/login', '/cadastro'];
const AUTH_COOKIE_NAME = 'auth_token';
const LOGIN_PAGE = '/login';

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isPublicPath = PUBLIC_PATHS.some(path => currentPath.startsWith(path));

  // 1. Bloqueia acesso a rotas protegidas se não houver token.
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
  }

  // 2. Trata rotas internas ou públicas com token.
  if (token) {
    try {
      // Validação do JWT (verifica assinatura e expiração)
      await jwtVerify(token, getJwtSecretKey(), { algorithms: ['HS256'] });

      // Se o token for válido E a rota for de login/cadastro, redireciona para a home.
      if (isPublicPath) {
          return NextResponse.redirect(new URL('/', request.url));
      }
      
      // Token OK em rota protegida, permite a navegação.
      return NextResponse.next();

    } catch (error) {
      // Falha na validação (Token inválido/expirado).
      const response = NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }

  // Permite acesso a rotas públicas (que chegaram até aqui sem token).
  return NextResponse.next();
}

export const config = {
  // Mantém o matcher abrangente para proteger tudo
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|api).*)'],
};