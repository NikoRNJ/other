# Instrucciones para Codex

Este repositorio contiene el MVP inicial de IronStack Social Bot.

## Objetivo del producto

Crear un panel para IronStack Studio que ayude a gestionar publicaciones, respuestas y potenciales clientes desde Instagram y Facebook usando IA.

## Reglas críticas

- No usar automatización por navegador para entrar a Instagram o Facebook.
- No pedir ni guardar contraseñas de redes sociales.
- Usar Meta Graph API y permisos oficiales.
- Mantener modo de aprobación humana antes de responder o publicar automáticamente.
- No prometer ventas garantizadas.
- No inventar precios.

## Tareas prioritarias para Codex

### 1. Supabase Auth

Implementar autenticación con Supabase para proteger `/studio`.

Criterios:
- Login con email/password.
- Middleware para proteger rutas privadas.
- Logout visible en el panel.

### 2. CRUD real de posts

Conectar el formulario del panel con `/api/posts`.

Criterios:
- Guardar borrador.
- Listar posts recientes.
- Editar caption, hashtags, CTA, redes y fecha programada.
- Cambiar estado entre draft y scheduled.

### 3. Calendario editorial

Crear vista simple por fecha.

Criterios:
- Mostrar posts programados.
- Permitir filtrar por red social.
- Alertar publicaciones sin imagen para Instagram.

### 4. Bandeja de mensajes

Crear una bandeja para comentarios/mensajes entrantes.

Criterios:
- Listar incoming_messages desde Supabase.
- Mostrar intent, isLead y suggested_reply.
- Botón para aprobar respuesta.
- Botón para convertir en lead.

### 5. Webhook Meta completo

Completar `/api/meta/webhook`.

Criterios:
- Validar firma X-Hub-Signature-256.
- Detectar comentarios/mensajes útiles.
- Guardar mensajes en Supabase.
- Generar suggested_reply con OpenAI.
- Responder siempre 200 rápido para evitar timeouts de Meta.

### 6. Publicación programada

Crear mecanismo para publicar posts scheduled.

Criterios:
- Endpoint protegido por CRON_SECRET.
- Buscar posts vencidos en estado scheduled.
- Publicar en redes seleccionadas.
- Guardar publishing_logs.
- Marcar published o failed.

### 7. Seguridad

Criterios:
- Nunca exponer service role key al frontend.
- Nunca imprimir tokens de Meta en logs.
- Validar todos los payloads con Zod.
- Añadir rate limit básico a endpoints de IA.

## Prompt operativo recomendado

Implementa la tarea 1 y 2 de CODEX.md. Mantén TypeScript estricto, usa componentes simples con Tailwind, valida payloads con Zod y no rompas las rutas existentes. Al finalizar, ejecuta typecheck y corrige errores.
