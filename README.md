# IronStack Social Bot

MVP para gestionar contenido de Instagram y Facebook con asistencia de IA para IronStack Studio.

## Objetivo

Crear un panel que permita:

- Generar publicaciones con IA usando la personalidad de IronStack Studio.
- Preparar captions, hashtags y llamadas a la acción.
- Guardar borradores y publicaciones programadas.
- Sugerir respuestas para comentarios o mensajes.
- Detectar posibles clientes interesados.
- Preparar integración con Meta Graph API para Facebook Page e Instagram Business.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- OpenAI API
- Meta Graph API

## Instalación

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables de entorno

Configura `.env.local` usando `.env.example`.

## Importante

Este proyecto está diseñado para usar APIs oficiales de Meta. No automatiza login con contraseña ni simula navegación humana, porque eso puede bloquear cuentas de Facebook o Instagram.

## Flujo recomendado

1. Crear post desde el panel.
2. Generar texto con IA.
3. Revisar y aprobar.
4. Guardar como borrador o programar.
5. Publicar mediante Meta API cuando las credenciales estén configuradas.

## Codex

Abre este repositorio en VS Code y pídele a Codex:

> Implementa el MVP completo de IronStack Social Bot siguiendo la arquitectura ya creada. Prioriza Supabase Auth, CRUD de posts, generación con OpenAI, bandeja de comentarios simulada y preparación segura para Meta Graph API.
