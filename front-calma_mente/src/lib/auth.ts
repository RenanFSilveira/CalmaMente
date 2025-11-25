// src/lib/auth.ts (Corrigido)

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getJwtSecretKey } from '@/lib/secrets'; 


interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export async function getAuthPayload(): Promise<JWTPayload | null> {
  const token = (await cookies()).get('auth_token')?.value; 

  if (!token) return null;

  // 🚨 CHAVE DE CORREÇÃO: Usar o helper que garante o formato consistente
  const secretKey = getJwtSecretKey(); 

  try {
    const { payload } = await jwtVerify(
      token,
      secretKey, // 👈 USAR O SEGREDO OBTIDO DO HELPER
      { algorithms: ['HS256'] }
    );
    
    // Retorna o payload tipado
    return payload as unknown as JWTPayload; 
  } catch (e) {
    console.error("Erro ao verificar JWT: JWSSignatureVerificationFailed", e);
    return null;
  }
}

// O componente de exemplo deve ser movido para app/(App)/config/page.tsx