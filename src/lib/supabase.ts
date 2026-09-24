import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * A conexão com o Supabase lê variáveis de ambiente definidas no arquivo
 * `.env` (que NUNCA vai para o git — veja .gitignore).
 *
 * Enquanto as variáveis estiverem vazias, `supabase` é `null` e o app
 * roda 100% local (localStorage) — a nuvem é opcional, por design.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True quando o `.env` tem URL + chave do Supabase. */
export const isCloudConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isCloudConfigured
  ? createClient(url as string, anonKey as string)
  : null;
