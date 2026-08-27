import { profile } from '../data/profile'

/**
 * Contact delivery — WhatsApp and email.
 *
 * Both paths work identically on localhost and on the deployed site, because
 * neither depends on a server we control:
 *
 *   WhatsApp → wa.me deep link, resolved by WhatsApp itself.
 *   Email    → a hosted form backend called straight from the browser,
 *              with a mailto: fallback when none is configured.
 */

export interface ContactMessage {
  name: string
  email: string
  message: string
}

/* ------------------------------------------------------------------ *
 * WhatsApp
 * ------------------------------------------------------------------ */

/**
 * Build a wa.me click-to-chat URL.
 *
 * wa.me is WhatsApp's official entry point: on mobile it opens the app, on
 * desktop it opens WhatsApp Web or the desktop client. No API key, no account,
 * no cost, and nothing to deploy — which is why it works "anytime", locally
 * and live, without a backend.
 */
export function whatsappLink(message: string = profile.whatsapp.greeting) {
  return `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(message)}`
}

/** Format a filled-in contact form as a readable WhatsApp message. */
export function whatsappMessageFrom({ name, email, message }: ContactMessage) {
  const lines = [
    'Hi Tamilarasan, I found your portfolio.',
    '',
    message.trim(),
    '',
    `— ${name.trim()}`,
    email.trim(),
  ]
  return lines.filter((line, i) => line !== '' || i > 0).join('\n')
}

/* ------------------------------------------------------------------ *
 * Email
 * ------------------------------------------------------------------ */

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
const CUSTOM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

export type EmailProvider = 'web3forms' | 'endpoint' | 'mailto'

/** Which delivery path is active, given the current environment config. */
export function emailProvider(): EmailProvider {
  if (WEB3FORMS_KEY) return 'web3forms'
  if (CUSTOM_ENDPOINT) return 'endpoint'
  return 'mailto'
}

/** True when a submit actually delivers mail rather than opening a mail client. */
export function emailDeliversDirectly() {
  return emailProvider() !== 'mailto'
}

function openMailClient({ name, email, message }: ContactMessage) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`)
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}

/**
 * Send the message. Resolves with how it was handled so the UI can tell the
 * truth about what happened — a mail client opening is not the same thing as
 * a message being delivered, and the form must not claim otherwise.
 */
export async function sendEmail(
  data: ContactMessage
): Promise<{ delivered: boolean; provider: EmailProvider }> {
  const provider = emailProvider()

  if (provider === 'mailto') {
    openMailClient(data)
    return { delivered: false, provider }
  }

  if (provider === 'web3forms') {
    // Web3Forms takes multipart form data, not JSON.
    const body = new FormData()
    body.append('access_key', WEB3FORMS_KEY as string)
    body.append('name', data.name)
    body.append('email', data.email)
    body.append('message', data.message)
    body.append('subject', `Portfolio enquiry from ${data.name}`)
    body.append('from_name', 'Portfolio contact form')
    // Honeypot: real people never fill this, bots usually do.
    body.append('botcheck', '')

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body,
    })

    const json = (await res.json()) as { success?: boolean; message?: string }
    if (!res.ok || !json.success) {
      throw new Error(json.message || `Web3Forms rejected the message (${res.status})`)
    }

    return { delivered: true, provider }
  }

  // Generic JSON endpoint — Formspree, Getform, a Worker, anything.
  const res = await fetch(CUSTOM_ENDPOINT as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return { delivered: true, provider }
}
