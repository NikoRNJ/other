'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bot, Loader2, MessageSquareText, Send, Sparkles } from 'lucide-react';

type GeneratedPost = {
  caption?: string;
  shortVersion?: string;
  hashtags?: string[];
  cta?: string;
  demo?: boolean;
};

type GeneratedReply = {
  reply?: string;
  intent?: string;
  isLead?: boolean;
  demo?: boolean;
};

export default function StudioPage() {
  const [idea, setIdea] = useState('Anuncio para negocios locales que todavía no tienen sitio web.');
  const [message, setMessage] = useState('Hola, cuánto sale una página para mi negocio?');
  const [postResult, setPostResult] = useState<GeneratedPost | null>(null);
  const [replyResult, setReplyResult] = useState<GeneratedReply | null>(null);
  const [publishResult, setPublishResult] = useState<unknown>(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  async function generatePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingPost(true);
    setPostResult(null);

    const response = await fetch('/api/ai/generate-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, format: 'post' }),
    });

    const data = await response.json();
    setPostResult(data.result ?? { caption: data.error });
    setLoadingPost(false);
  }

  async function generateReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingReply(true);
    setReplyResult(null);

    const response = await fetch('/api/ai/generate-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setReplyResult(data.result ?? { reply: data.error });
    setLoadingReply(false);
  }

  async function testPublish() {
    if (!postResult?.caption) return;
    setLoadingPublish(true);
    setPublishResult(null);

    const response = await fetch('/api/social/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caption: `${postResult.caption}\n\n${postResult.cta ?? ''}\n${postResult.hashtags?.join(' ') ?? ''}`,
        networks: ['facebook'],
      }),
    });

    const data = await response.json();
    setPublishResult(data);
    setLoadingPublish(false);
  }

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-8 text-slate-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:flex-row md:items-center">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
              <ArrowLeft size={16} /> Volver
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                <Bot size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Panel operativo</p>
                <h1 className="text-2xl font-bold">IronStack Social Bot</h1>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
            Modo seguro: si faltan tokens, no publica; devuelve dry-run.
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-5 flex items-center gap-3">
              <Sparkles className="text-blue-300" />
              <div>
                <h2 className="text-xl font-semibold">Generar publicación</h2>
                <p className="text-sm text-slate-400">Caption, versión breve, CTA y hashtags con tu tono comercial.</p>
              </div>
            </div>

            <form onSubmit={generatePost} className="space-y-4">
              <textarea
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                className="min-h-32 w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none ring-blue-500/40 focus:ring-2"
              />
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400" disabled={loadingPost}>
                {loadingPost ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generar post
              </button>
            </form>

            {postResult && (
              <div className="mt-5 space-y-4 rounded-2xl bg-slate-950 p-5">
                <p className="text-sm text-slate-400">Resultado</p>
                <p className="leading-7 text-slate-100">{postResult.caption}</p>
                {postResult.shortVersion && <p className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">{postResult.shortVersion}</p>}
                {postResult.cta && <p className="font-semibold text-blue-200">{postResult.cta}</p>}
                {postResult.hashtags && <p className="text-sm text-slate-400">{postResult.hashtags.join(' ')}</p>}
                <button onClick={testPublish} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10" disabled={loadingPublish}>
                  {loadingPublish ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  Probar publicación Facebook
                </button>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-5 flex items-center gap-3">
              <MessageSquareText className="text-blue-300" />
              <div>
                <h2 className="text-xl font-semibold">Responder mensaje</h2>
                <p className="text-sm text-slate-400">Detecta intención de compra y propone una respuesta breve.</p>
              </div>
            </div>

            <form onSubmit={generateReply} className="space-y-4">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-32 w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none ring-blue-500/40 focus:ring-2"
              />
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400" disabled={loadingReply}>
                {loadingReply ? <Loader2 className="animate-spin" size={18} /> : <MessageSquareText size={18} />}
                Generar respuesta
              </button>
            </form>

            {replyResult && (
              <div className="mt-5 space-y-4 rounded-2xl bg-slate-950 p-5">
                <p className="text-sm text-slate-400">Respuesta sugerida</p>
                <p className="leading-7 text-slate-100">{replyResult.reply}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-blue-200">Intento: {replyResult.intent ?? 'unknown'}</span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">Lead: {replyResult.isLead ? 'sí' : 'no'}</span>
                </div>
              </div>
            )}
          </section>
        </div>

        {publishResult ? (
          <pre className="overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-5 text-xs text-slate-300">
            {JSON.stringify(publishResult, null, 2)}
          </pre>
        ) : null}
      </section>
    </main>
  );
}
