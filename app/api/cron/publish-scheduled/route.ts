import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { publishToSelectedNetworks } from '@/lib/meta';

export async function POST(request: Request) {
  const expectedToken = process.env.CRON_TOKEN;
  const receivedToken = request.headers.get('x-cron-token');

  if (expectedToken && receivedToken !== expectedToken) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const now = new Date().toISOString();

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_at', now)
      .limit(10);

    if (error) throw error;

    const results = [];

    for (const post of posts ?? []) {
      const publishResult = await publishToSelectedNetworks({
        caption: [post.caption, post.cta, (post.hashtags ?? []).join(' ')].filter(Boolean).join('\n\n'),
        mediaUrl: post.media_url ?? undefined,
        linkUrl: post.link_url ?? undefined,
        networks: post.networks ?? ['facebook'],
      });

      await supabase.from('publishing_logs').insert({
        post_id: post.id,
        network: 'facebook',
        success: true,
        response_payload: publishResult,
      });

      await supabase
        .from('posts')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', post.id);

      results.push({ postId: post.id, publishResult });
    }

    return NextResponse.json({ ok: true, processed: results.length, results });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Cron publish failed' },
      { status: 500 },
    );
  }
}
