import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateIronStackReply } from '@/lib/openai';

const schema = z.object({
  message: z.string().min(2, 'El mensaje es demasiado corto.'),
  context: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const result = await generateIronStackReply(body);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'No se pudo generar la respuesta.',
      },
      { status: 400 },
    );
  }
}
