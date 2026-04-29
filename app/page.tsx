import Link from 'next/link';
import { Bot, CalendarDays, MessageSquareText, Send, ShieldCheck, Sparkles } from 'lucide-react';

const metrics = [
  { label: 'Posts preparados', value: '12' },
  { label: 'Respuestas sugeridas', value: '38' },
  { label: 'Leads detectados', value: '9' },
];

const features = [
  {
    icon: Sparkles,
    title: 'Generador con IA',
    description: 'Crea captions, versiones breves, hashtags y llamados a la acción con el tono de IronStack Studio.',
  },
  {
    icon: CalendarDays,
    title: 'Calendario social',
    description: 'Organiza borradores, contenido programado y publicaciones listas para Facebook e Instagram.',
  },
  {
    icon: MessageSquareText,
    title: 'Respuestas inteligentes',
    description: 'Sugiere respuestas breves, profesionales y orientadas a convertir interesados en conversaciones reales.',
  },
  {
    icon: ShieldCheck,
    title: 'Modo seguro',
    description: 'Evita usar contraseñas o automatización riesgosa. Está pensado para trabajar con APIs oficiales.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#123b6d,transparent_35%),#05070d] px-5 py-8 text-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
              <Bot size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-400">IronStack Studio</p>
              <h1 className="text-lg font-semibold">Social Bot</h1>
            </div>
          </div>
          <Link href="/studio" className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400">
            Abrir panel
          </Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              MVP para gestionar contenido y respuestas con IA
            </div>
            <div className="space-y-5">
              <h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                Publica, responde y detecta clientes sin perder el tono de tu marca.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Un panel para preparar posts, stories, anuncios y respuestas comerciales de IronStack Studio. Primero sugiere y guarda; luego publica mediante Meta Graph API cuando conectes tus credenciales.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/studio" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400">
                Crear contenido <Send size={18} />
              </Link>
              <a href="https://github.com/NikoRNJ/other" className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
                Ver repositorio
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-slate-950/80 p-5">
              <p className="mb-4 text-sm text-slate-400">Respuesta sugerida</p>
              <p className="text-xl font-semibold leading-8">
                Hola, gracias por escribirnos. Podemos ayudarte con una web profesional para que tu negocio se vea más confiable y reciba más contactos. Escríbenos por WhatsApp y revisamos tu caso.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm text-blue-200">Lead detectado</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">Interés comercial</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">Requiere aprobación</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Icon className="mb-4 text-blue-300" size={24} />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
