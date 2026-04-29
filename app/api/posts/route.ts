import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdminClient } from '@/lib/supabase';

const createPostSchema = z.object({
  title: z.string().min(2),
  baseIdea: z.string().min(5),
  caption: z.string().optional(),
  shortVersion: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  cta: z.string().optional(),
  networks: z.array(z.enum(['facebook', 'instagram'])).default(['facebook', 'instagram']),
  mediaUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'failed']).default('draft'),
  scheduledAt: z.string().datetime().optional(),
});

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(50);

    if (error) throw error;

    return NextResponse.json({ ok: true, posts: data });
  } catch (error) {
    return NextResponse.json({
      ok: true,
      mode: 'demo',
      warning: error instanceof Error ? error.message : 'Supabase no está configurado.',
      posts: [],
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = createPostSchema.parse(await request.json());
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: body.title,
        base_idea: body.baseIdea,
        caption: body.caption,
        short_version: body.shortVersion,
        hashtags: body.hashtags ?? [],
        cta: body.cta,
        networks: body.networks,
        media_url: body.mediaUrl,
        link_url: body.linkUrl,
        status: body.status,
        scheduled_at: body.scheduledAt,
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, post: data });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'No se pudo guardar el post.',
      },
      { status: 400 },
    );
  }
}
