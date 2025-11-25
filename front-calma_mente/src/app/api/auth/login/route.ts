// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
// Removido: import { compare } from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { SignJWT } from "jose";
// Supondo que você use este helper para pegar a chave
import { getJwtSecretKey } from '@/lib/secrets'; 

// 🚨 1. CONFIGURAÇÃO COM ANON KEY (Seguro)
// Removemos a SERVICE_ROLE_KEY
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
);

interface UserPayload {
  id: string;
  email: string;
  role: string;
  [key: string]: unknown; 
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1. CHAMA O SUPABASE AUTH (Verifica auth.users e senha)
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    // Erro de credencial inválida
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const user = authData.user;
  
  const { data: userArray } = await supabase
    .from("usuario") 
    .select("*")
    .eq("id", user.id);

  const userData = userArray && userArray.length > 0 ? userArray[0] : null;

  if (!userData) {      
    return NextResponse.json({ error: "Perfil de usuário ausente" }, { status: 404 });
  }

  const userRole = userData.tipo || 'user'; // Assumindo 'tipo' é o campo de papel

  // Verifica se email existe no usuário autenticado
  if (!user.email) {
    return NextResponse.json({ error: "Email do usuário ausente" }, { status: 500 });
  }

  // 3. GERA TOKEN JWT
  const payload: UserPayload = { 
      id: user.id, 
      email: user.email,
      role: userRole, 
  };
  
  const secretKey = getJwtSecretKey(); 
  
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secretKey); // Usa a chave de bytes do helper

  // 4. CRIA RESPOSTA E DEFINE COOKIE
  const res = NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, role: userRole } 
  }, { status: 200 });

  res.cookies.set("auth_token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res;
}