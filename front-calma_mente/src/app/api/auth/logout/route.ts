// app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
    try {        
        // A resposta que será enviada de volta ao navegador
        const response = NextResponse.json({ success: true, message: 'Logout bem-sucedido.' });

        // 🚨 PASSO CRUCIAL: Limpar o cookie
        response.cookies.set('auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            expires: new Date(0), // Define a data de expiração para o passado
        });

        return response;
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
    }
}