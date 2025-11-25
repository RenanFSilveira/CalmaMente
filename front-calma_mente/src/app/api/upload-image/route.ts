// app/api/upload-image/route.ts

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Define o limite de tamanho de arquivo (em bytes)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // Ex: 4.5 MB

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // O TipTap enviará o nome do arquivo, mas vamos forçar um nome único por segurança
  const filename = searchParams.get('filename') || 'default-image';

  // 1. Garante que o corpo da requisição é um FormData
  const formData = await request.formData();
  const file = formData.get('file');

  // Verifica se o arquivo existe e é válido
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado ou formato inválido.' }, { status: 400 });
  }

  // Verifica o tamanho do arquivo
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: `O arquivo excede o limite de ${MAX_FILE_SIZE / 1024 / 1024}MB.` }, { status: 400 });
  }

  try {
    // 2. Chama a função `put` do Vercel Blob (segura, pois usa a variável de ambiente do lado do servidor)

    const blob = await put(filename, file, {
      access: 'public', // Permite que a imagem seja acessada via URL
      addRandomSuffix: true, // Adiciona um sufixo único para evitar colisões de nome
      contentType: file.type,
    });

    // 3. Retorna a URL pública para o frontend
    return NextResponse.json({ url: blob.url });
    
  } catch (error) {
    console.error('Erro ao fazer upload para o Vercel Blob:', error);
    return NextResponse.json({ error: 'Erro interno do servidor ao salvar a imagem.' }, { status: 500 });
  }
}