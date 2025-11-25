import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const resposta = await fetch(
      "https://n8n-n8n.v14x8c.easypanel.host/webhook/calculadora-de-taxas",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await resposta.json();

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Erro ao enviar para webhook:", error);

    let message = "Erro inesperado";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
