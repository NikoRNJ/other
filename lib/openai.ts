import OpenAI from 'openai';
import { ironstackBrandVoice } from '@/lib/brand';

const model = process.env.OPENAI_MODEL || 'gpt-5.4-mini';

export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateIronStackPost(input: {
  idea: string;
  audience?: string;
  format?: 'post' | 'story' | 'ad';
}) {
  const audience = input.audience || 'negocios locales, emprendedores y pymes de Chile';
  const format = input.format || 'post';

  if (!openai) {
    return {
      caption: `¿Tu negocio todavía depende solo de redes sociales? En IronStack Studio creamos sitios web profesionales para que tus clientes encuentren tu servicio, vean confianza y te contacten directo por WhatsApp.`,
      shortVersion: 'Tu negocio puede verse más serio y recibir más contactos con una web clara, rápida y profesional.',
      hashtags: ['#IronStackStudio', '#SitiosWeb', '#NegociosLocales', '#EmprendedoresChile'],
      cta: 'Escríbenos y revisamos qué tipo de web necesita tu negocio.',
      format,
      audience,
      demo: true,
    };
  }

  const response = await openai.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: `${ironstackBrandVoice}\nDevuelve solo JSON válido con: caption, shortVersion, hashtags, cta.`,
      },
      {
        role: 'user',
        content: `Crea contenido para formato ${format}. Idea: ${input.idea}. Audiencia: ${audience}.`,
      },
    ],
  });

  const raw = response.output_text;

  try {
    return JSON.parse(raw);
  } catch {
    return {
      caption: raw,
      shortVersion: raw.slice(0, 180),
      hashtags: ['#IronStackStudio'],
      cta: 'Escríbenos para revisar tu caso.',
      format,
      audience,
      demo: false,
    };
  }
}

export async function generateIronStackReply(input: { message: string; context?: string }) {
  if (!openai) {
    return {
      reply: 'Hola, gracias por escribirnos. Podemos ayudarte con una web profesional para que tu negocio se vea más confiable y reciba más contactos. Escríbenos por WhatsApp y revisamos tu caso.',
      intent: detectLeadIntent(input.message),
      isLead: detectLeadIntent(input.message) !== 'unknown',
      demo: true,
    };
  }

  const response = await openai.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: `${ironstackBrandVoice}\nDevuelve solo JSON válido con: reply, intent, isLead. intent puede ser price, interest, support, spam o unknown.`,
      },
      {
        role: 'user',
        content: `Mensaje recibido: ${input.message}\nContexto opcional: ${input.context || 'Sin contexto adicional'}`,
      },
    ],
  });

  const raw = response.output_text;

  try {
    return JSON.parse(raw);
  } catch {
    return {
      reply: raw,
      intent: detectLeadIntent(input.message),
      isLead: detectLeadIntent(input.message) !== 'unknown',
      demo: false,
    };
  }
}

function detectLeadIntent(message: string) {
  const text = message.toLowerCase();
  if (text.includes('precio') || text.includes('cuánto') || text.includes('cuanto') || text.includes('valor')) return 'price';
  if (text.includes('web') || text.includes('página') || text.includes('pagina') || text.includes('whatsapp') || text.includes('negocio')) return 'interest';
  if (text.includes('ayuda') || text.includes('problema')) return 'support';
  if (text.includes('spam')) return 'spam';
  return 'unknown';
}
