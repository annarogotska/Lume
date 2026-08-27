/* Contact form submission via the `contact` Supabase Edge Function.
   Server-side re-checks honeypot + timestamp, so a request that skips the
   browser (posted straight to an API) can't skip those checks too. */

export interface ContactPayload {
  name: string;
  email: string;
  type: string;
  budget?: string;
  message?: string;
  honeypot: string;
  loadedAt: number;
  turnstileToken: string;
}

const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact`;

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(FUNCTIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error ?? "Contact submission failed");
}
