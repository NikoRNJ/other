import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateIronStackPost } from '@/lib/openai';

const schema = z.object({
  idea: z.string().min(5, 'La idea debe tener al menos 5 caracteres.'),
  audience: z.string().optional(),
  format: z.enum(['post', 'story', 'ad']).optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const result = await generateIronStackPost(body);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'No se pudo generar el contenido.',
      },
      { status: 400 },
    );
  }
}
