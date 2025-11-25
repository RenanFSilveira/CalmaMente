// app/api/blog/create/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidateTag, revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.SUPABASE_URL!,                 
  process.env.SUPABASE_SERVICE_ROLE_KEY!    
);

const cleanSlug = (title: string, category: string): string => {
  let generatedSlug = title.toLowerCase();
  generatedSlug = generatedSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  generatedSlug = generatedSlug.replace(/[^a-z0-9\s-]/g, '');
  generatedSlug = generatedSlug.trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const categoryPrefix = category.toLowerCase().trim().replace(/\s+/g, '-');
  return `${categoryPrefix}/${generatedSlug}`;
};

export async function POST(request: Request) {
  try {
    const blogData = await request.json();

    // 1) Validação básica
    if (!blogData.titulo || !blogData.conteudoHtml || !blogData.imgPrincipalUrl || !blogData.categoria) {
      return NextResponse.json(
        { message: 'Dados incompletos. Título, conteúdo, categoria e URL da imagem principal são obrigatórios.' },
        { status: 400 }
      );
    }

    const finalSlug = cleanSlug(blogData.titulo, blogData.categoria);

    // 2) Inserção
    const { data, error } = await supabase
      .from('posts_blog')
      .insert([
        {
          titulo: blogData.titulo,
          subtitulo: blogData.subTitulo ?? null,
          categoria: blogData.categoria,
          conteudo_html: blogData.conteudoHtml,
          imagem_url: blogData.imgPrincipalUrl,
          slug: finalSlug,
          data_publicacao: new Date().toISOString(),
          imagem_alt: blogData.titulo,
          status: true, // ✅ boolean, não string
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro no Supabase:', error.message);
      return NextResponse.json(
        { message: `Falha ao salvar o blog no banco de dados. ${error.message}` },
        { status: 500 }
      );
    }

    // 3) Revalidação de cache e rotas (antes do return)
    try {
      revalidateTag('blogs'); // listas gerais

      if (data?.categoria) revalidateTag(`blogs:category:${data.categoria}`);
      // se você usa blocos limitados (ex.: home):
      revalidateTag('blogs:limited:3');

      if (data?.slug) revalidateTag(`blog:slug:${data.slug}`);

      // (Opcional) revalide páginas
      revalidatePath('/blog');
      if (data?.categoria) revalidatePath(`/blog/categoria/${data.categoria}`);
      if (data?.slug) revalidatePath(`/blog/${data.slug}`); // considere como sua rota de post resolve o slug
    } catch (revErr) {
      console.error('Erro ao revalidar cache:', revErr);
      // não falhe a requisição por causa de cache
    }

    // 4) Sucesso
    return NextResponse.json(
      { message: 'Blog criado com sucesso!', blog: data },
      { status: 201 }
    );
  } catch (err) {
    console.error('Erro geral ao processar a criação do blog:', err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
