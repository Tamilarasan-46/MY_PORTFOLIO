# Tamilarasan M — Portfolio

Personal portfolio for **Tamilarasan M**, Software Developer (ERP · AI Accounting · Vue.js · Phoenix · Elixir).

Built with React 19, TypeScript, Vite 7 and Tailwind CSS 3. Every fact on the page is
sourced from the CV and lives in one file — [`src/data/profile.ts`](src/data/profile.ts).

---

## Quick start

```sh
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then production build to `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run lint` | ESLint over the whole project |

---

## Project structure

```
src/
├── data/profile.ts        ← single source of truth for all CV content
├── hooks/use-reveal.ts    ← shared scroll-reveal observer
├── sections/              ← Hero, About, Skills, Experience, Projects, Education, Contact
├── components/
│   ├── Navigation.tsx
│   └── ui/                ← shadcn/ui primitives
├── index.css              ← design tokens + component classes
└── App.tsx
```

### Updating the content

Edit `src/data/profile.ts` — nothing else. Summary, skills, experience bullets,
projects, education, certifications, contact details and social links all read
from it, so the CV and the site can never drift apart.

To refresh the downloadable résumé, replace `public/Tamilarasan_CV.pdf`.

---

## Design system

No hardcoded colours anywhere in the sections. The palette is defined once as
channel triplets in `src/index.css` and exposed to Tailwind in
`tailwind.config.js`, so opacity modifiers (`bg-brand/10`) work throughout.

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#010101` | Page ground |
| `panel` / `panel-raised` | `#1c1c1c` / `#242426` | Card surfaces |
| `line` / `line-strong` | `#414142` / `#5c5c5e` | Hairlines |
| `fg` / `fg-muted` / `fg-subtle` | `#ffffff` / `#e8e8e8` / `#aeaeae` | Text ramp |
| `brand` | `#acf96d` | Primary accent |
| `beam` / `flare` / `solar` | `#7dd3fc` / `#f472b6` / `#fbbf24` | Secondary accents |

Type: **Space Grotesk** for display, **Inter** for body. Reusable component
classes (`.btn-primary`, `.surface-card`, `.chip`, `.eyebrow`, `.field-input`)
live in the `@layer components` block of `src/index.css`.

Accessibility: skip link, one consistent `:focus-visible` ring, `aria-current`
on active nav items, live regions on the typing headline and form status, and a
`prefers-reduced-motion` block that disables decorative motion.

---

## Contact — WhatsApp & email

Both work identically on `localhost` and on the deployed site, because neither
depends on a server we run.

**WhatsApp** needs no setup at all. `src/lib/contact.ts` builds a `wa.me`
click-to-chat link — WhatsApp's own entry point, which opens the app on mobile
and WhatsApp Web on desktop. Three entry points: the hero social row, a card in
the contact section, and a floating button that appears once you scroll past the
hero. The "Send on WhatsApp" button packages whatever is typed in the form into
a formatted message.

**Email** needs one free key. Without it the form honestly opens the visitor's
mail client (the button reads "Open email client"); with it, messages are
delivered straight to the inbox and the button reads "Send email".

1. Go to <https://web3forms.com/#start> and enter the destination address.
2. The access key arrives by email in seconds — no account, no credit card.
3. Put it in `.env` as `VITE_WEB3FORMS_KEY=...`

Free tier is 250 submissions/month. The key is public by design (Web3Forms
documents this — it is an alias for the inbox, not a credential), which is
just as well: anything `VITE_`-prefixed is inlined into the client bundle.

A hidden `botcheck` honeypot field filters bots. `VITE_CONTACT_ENDPOINT` is
supported as an alternative for any backend that accepts a JSON POST.

> Firebase was evaluated and rejected: Cloud Functions and the Trigger Email
> extension both require the Blaze plan, which requires a credit card on file.
> See [DEPLOYMENT.md](DEPLOYMENT.md#contact-form-email-delivery).

## Configuration

Copy `.env.example` to `.env` if you need any of these:

| Variable | Effect |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | Web3Forms access key. Set → the form delivers email for real. Unset → it opens the visitor's mail client rather than faking a send. |
| `VITE_CONTACT_ENDPOINT` | Alternative JSON POST endpoint (Formspree, Getform, a Worker). Only used when the Web3Forms key is empty. |
| `VITE_BASE` | Vite base path. Defaults to `./`, which works on GitHub Pages, Docker and Cloudflare Pages alike. |

---

## Deployment

Full walkthrough in **[DEPLOYMENT.md](DEPLOYMENT.md)**. In short:

```sh
# Local production image
docker compose up --build      # http://localhost:8080

# Kubernetes
kubectl apply -k k8s/
```

CI/CD lives in `.github/workflows/`:

| Workflow | Trigger | Does |
| --- | --- | --- |
| `ci.yml` | push / PR | lint, typecheck, build, report bundle size |
| `deploy-pages.yml` | push to `main` | build and publish the live site to GitHub Pages |
| `publish-image.yml` | push / tag | multi-arch image → `ghcr.io` |
| `k8s-validate.yml` | changes under `k8s/` | kubeconform + a real rollout on a kind cluster |

---

## Licence

Content (CV text, résumé, photographs) © Tamilarasan M. Code MIT.
