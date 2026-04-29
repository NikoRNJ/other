import { NextResponse } from 'next/server';
import { z } from 'zod';
import { publishToSelectedNetworks } from '@/lib/meta';

const schema = z.object({
  caption: z.string().min(5),
  mediaUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  networks: z.array(z.enum(['facebook', 'instagram'])).min(1),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const result = await publishToSelectedNetworks(body);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'No se pudo publicar el contenido.',
      },
      { status: 400 },
    );
  }
}
