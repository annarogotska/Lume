/* Supabase browser client. Reads public env vars (safe to expose). */
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Don't crash the whole site if env is missing — the contact form will surface the error.
  console.warn("Supabase env missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
}

export const supabase = createClient(url ?? "", anonKey ?? "");

export interface ContactPayload {
  name: string;
  email: string;
  type: string;
  budget?: string;
  message?: string;
}

/** Submit the contact form — stores the lead and triggers the notification email
 *  via the `contact` Edge Function. Throws on failure. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const { data, error } = await supabase.functions.invoke("contact", { body: payload });
  if (error) throw error;
  if (data && (data as { error?: string }).error) throw new Error((data as { error: string }).error);
}
