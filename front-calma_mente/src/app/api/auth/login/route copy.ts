// app/api/login/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SignJWT } from "jose";
import { getJwtSecretKey } from '@/lib/secrets'; // Assumindo que você usa este helper

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


interface UserPayload {
  id: string;
  email: string;
  role: string;
  
  // 👈 CORREÇÃO: Index Signature
  [key: string]: unknown; 
  // Isso diz ao TS: "Pode haver outras propriedades string que não estão listadas."
}

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const secretKey = getJwtSecretKey(); // Obtém a chave secreta tipada

  // 1. LOGIN SUPABASE
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error("Erro de Autenticação Supabase:", authError?.message);
    return NextResponse.json(
      { error: "Credenciais inválidas. Verifique seu email e senha." },
      { status: 401 }
    );
  }

  const user = authData.user;
  
  // 2. BUSCA DO PERFIL
  const { data: userArray, error: userError } = await supabase
    .from("usuario") 
    .select("*")
    .eq("id", user.id);
    
  if (userError) {
      console.error("Erro SQL ao buscar perfil:", userError.message);
      return NextResponse.json({ error: "Erro de banco de dados ao buscar perfil." }, { status: 500 });
  }

  if (!userArray || userArray.length === 0) {
      console.error("ID não encontrado na tabela 'usuario'. ID:", user.id);
      return NextResponse.json({ 
          error: "Perfil de usuário incompleto ou ausente. (ID do Auth não encontrado na tabela Perfil)" 
      }, { status: 404 });
  }

  const userData = userArray[0];

  // CORREÇÃO: Usamos 'userData.tipo' (do banco) como 'role' no payload do JWT.
  const userRole = userData.tipo || 'user'; // Garante um valor padrão

  // 3. CRIAÇÃO E ASSINATURA DO JWT
  const jwt = await new SignJWT({ 
      id: user.id, 
      email: user.email,
      role: userRole, // USANDO 'tipo' como 'role'
  } as UserPayload) // Type assertion para garantir o tipo do payload
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secretKey);

  // 4. RESPOSTA E COOKIE
  const res = NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, role: userRole } // Corrigido para retornar userRole
  }, { status: 200 });

  res.cookies.set("auth_token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  
  return res;
}