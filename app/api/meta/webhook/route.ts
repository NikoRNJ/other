import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return new Response(challenge ?? '', { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
  const payload = await request.json();

  // TODO: validar firma X-Hub-Signature-256 antes de procesar en producción.
  // TODO: guardar comentarios/mensajes en Supabase y generar suggested_reply con OpenAI.
  console.log('Meta webhook payload', JSON.stringify(payload));

  return NextResponse.json({ ok: true, received: true });
}
