/* Contact form submission via Web3Forms. */

export interface ContactPayload {
  name: string;
  email: string;
  type: string;
  budget?: string;
  message?: string;
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: "ebf50d7f-3ccd-4013-86bb-1046a208dcf4",
      name: payload.name,
      email: payload.email,
      subject: `New brief from ${payload.name} — ${payload.type}`,
      message: [
        `Type: ${payload.type}`,
        payload.budget ? `Budget: ${payload.budget}` : null,
        payload.message ? `\n${payload.message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message ?? "Web3Forms error");
}
