'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bot, Loader2, LogIn } from 'lucide-react';

import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/studio';

  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const buttonLabel = useMemo(() => {
    if (!configured) return 'Configurar Supabase';
    return isPending ? 'Ingresando…' : 'Iniciar sesión';
  }, [configured, isPending]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!configured) {
      setError('Supabase no está configurado. Completa .env.local y reinicia el server.');
      return;
    }

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setError(signInError.message);
          return;
        }

        router.push(nextPath);
        router.refresh();
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'No se pudo iniciar sesión.');
      }
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#123b6d,transparent_35%),#05070d] px-5 py-10 text-slate-50">
      <section className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
            <Bot size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400">IronStack Studio</p>
            <h1 className="text-2xl font-bold">Ingresar al panel</h1>
          </div>
        </header>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          {!configured && (
            <div className="mb-4 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm text-yellow-100">
              Configuración pendiente: falta `NEXT_PUBLIC_SUPABASE_URL` y/o `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none ring-blue-500/40 focus:ring-2"
                placeholder="tu@correo.cl"
                autoComplete="email"
                required
                disabled={!configured || isPending}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none ring-blue-500/40 focus:ring-2"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={!configured || isPending}
              />
            </div>

            {error && <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!configured || isPending}
            >
              {isPending ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
              {buttonLabel}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

