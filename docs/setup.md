# Setup local

## 1. Clonar repositorio

```bash
git clone https://github.com/NikoRNJ/other.git ironstack-social-bot
cd ironstack-social-bot
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Variables de entorno

```bash
cp .env.example .env.local
```

Completa:

- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `META_PAGE_ID`
- `META_PAGE_ACCESS_TOKEN`
- `META_INSTAGRAM_BUSINESS_ID`
- `META_WEBHOOK_VERIFY_TOKEN`

## 4. Supabase

Abre Supabase SQL Editor y ejecuta:

```bash
supabase/schema.sql
```

## 5. Ejecutar

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
http://localhost:3000/studio
```

## 6. Probar sin credenciales

El proyecto funciona en modo demo si faltan claves. Puede generar contenido simulado y probar endpoints sin publicar realmente.

## 7. Prompt recomendado para Codex

```text
Lee README.md, CODEX.md y docs/setup.md. Implementa Supabase Auth y CRUD completo de posts. Mantén TypeScript estricto, valida payloads con Zod y no expongas tokens al frontend.
```
