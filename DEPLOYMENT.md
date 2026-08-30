# Deployment

Everything here is **free of cost**. Where "free" comes with a catch, the catch is stated.

Researched and verified August 2026. Free tiers move — the "verify before you rely on it"
notes flag the ones that moved recently.

---

## TL;DR — what to actually do

| Layer | Choice | Cost | Card needed |
| --- | --- | --- | --- |
| CI/CD | GitHub Actions on a **public** repo | Free, unlimited minutes | No |
| Live site | **GitHub Pages** (or Cloudflare Pages) | Free | No |
| Docker image | **ghcr.io** (public package) | Free, unmetered | No |
| Kubernetes | **kind cluster inside CI** | Free | No |

That is a complete, genuinely $0, no-credit-card pipeline: lint and build, a multi-arch
image, a real Kubernetes cluster that applies the manifests and verifies the rollout, and
the live site.

**Only the Pages deploy runs automatically.** CI, the image publish and the Kubernetes
validation are `workflow_dispatch` only, so a commit to `main` publishes the site and
nothing else. They are unchanged otherwise — start them from the Actions tab with
"Run workflow", or restore the `push:` triggers commented at the top of each file.

**The one honest caveat:** a *permanently running* managed Kubernetes cluster is **not**
free in 2026 (see [§5](#5-kubernetes--the-honest-answer)). Everything else on your list is.

---

## 1. Prerequisites (once)

```sh
cd "d:/My WorkSpaces/app"
git init
git add -A
git commit -m "Portfolio: CV-driven rebuild + deployment pipeline"
```

Create a **public** repo on GitHub (public is what makes Actions minutes and GHCR
unlimited), then:

```sh
git remote add origin https://github.com/Tamilarasan-46/<repo-name>.git
git branch -M main
git push -u origin main
```

---

## 2. Live site — GitHub Pages

**One-time setup:** repo → **Settings → Pages → Build and deployment → Source: GitHub Actions.**
That is the entire configuration. No secrets, no tokens, no card.

`.github/workflows/deploy-pages.yml` then runs on every push to `main` and publishes to:

```
https://tamilarasan-46.github.io/<repo-name>/
```

**How the base path is handled.** A project page is served from `/<repo-name>/`, not `/`.
The workflow sets `VITE_BASE=/${{ github.event.repository.name }}/` at build time so assets
resolve. If you instead name the repo `Tamilarasan-46.github.io` (a user page served from `/`),
change that line to `VITE_BASE: /`.

**SPA fallback.** GitHub Pages has no rewrite rule, so the workflow copies
`dist/index.html` → `dist/404.html`. Pages serves that for any unmatched path with the URL
preserved. This site is a single page with hash anchors so it barely matters today — it
matters the moment a router is added.

**Custom domain.** Settings → Pages → Custom domain. Free Let's Encrypt TLS, auto-renewed.
Add a `CNAME` DNS record pointing at `tamilarasan-46.github.io`.

**Limits:** 1 GB site size, 100 GB/month soft bandwidth. The GitHub Pages ToS prohibits
"commercial operations, e-commerce or SaaS" — fine for a portfolio, but see the Cloudflare
option below if that ever becomes a concern.

---

## 3. Live site — Cloudflare Pages (the stronger option)

Better than GitHub Pages on three counts: **unlimited bandwidth**, **no commercial-use
restriction**, and **native SPA fallback** (no `404.html` trick). Still no credit card.

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) — no card.
2. **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `VITE_BASE` = `/`
4. Deploy. You get `https://<project>.pages.dev` plus free TLS on a custom domain.

Cloudflare builds from the repo itself, so there is no workflow file to maintain and no
action version to keep current. Free plan: 500 builds/month, unlimited requests and egress.

**Use Cloudflare if you want one host. Use both if you want a mirror** — they don't conflict.

---

## 4. Docker image — GitHub Container Registry

`.github/workflows/publish-image.yml` builds `linux/amd64` + `linux/arm64` and pushes to
`ghcr.io/<owner>/<repo>` using the auto-provisioned `GITHUB_TOKEN`. **No PAT, no secret to
create.**

**One manual step after the first successful run.** New packages are created **private**,
and a workflow cannot change that. Go to the package page → **Package settings → Danger
Zone → Change visibility → Public**. Public packages are free and unmetered; private ones
currently are too, but that rests on a GitHub carve-out that can end on 30 days' notice.

Test the exact production image locally before you trust it:

```sh
docker compose up --build
# http://localhost:8080
```

`docker-compose.yml` mirrors the Kubernetes `securityContext` — read-only root filesystem,
`user: 101:101`, all capabilities dropped — so "works locally, breaks in the cluster" stays rare.

### About the image

Multi-stage: `node:24-alpine` builds, `nginxinc/nginx-unprivileged:1.31-alpine` serves.
The unprivileged image runs as uid 101 and listens on **8080**, which is what makes
`readOnlyRootFilesystem: true` possible — it keeps every writable path under `/tmp`.

`deploy/nginx.conf` handles SPA routing (`try_files $uri $uri/ /index.html`), gzip,
immutable caching for hashed `/assets/`, no-cache on `index.html`, a `/healthz` endpoint for
probes, and security headers including a CSP that allows Google Fonts and nothing else.

---

## 5. Kubernetes — the honest answer

**What the manifests give you.** `k8s/` is production-shaped, not decorative:
non-root, read-only root filesystem, all capabilities dropped, `RuntimeDefault` seccomp,
startup/readiness/liveness probes, an HPA, a PodDisruptionBudget, and topology spread.

```sh
kubectl apply -k k8s/
kubectl rollout status deployment/portfolio
```

**How it's verified for free.** `.github/workflows/k8s-validate.yml` — run it manually from
the Actions tab:

1. `kubeconform` — schema validation against Kubernetes 1.36 (fast, no cluster).
2. A real **kind** cluster inside the runner — builds this commit's image, loads it,
   `kubectl apply -k`, waits for the rollout, then curls `/healthz` and `/` from inside
   the cluster.

That proves the manifests genuinely work, whenever you run it, at zero cost.

### Why there is no free 24/7 cluster

Every mainstream provider follows the same pattern — **free control plane, paid worker nodes**:

| Provider | Control plane | Cheapest node | Ongoing free tier |
| --- | --- | --- | --- |
| Linode / Akamai LKE | Free | $5.00/mo | No — $100 credit, trial only |
| Civo | Free | $5.43/mo | No — $250 credit, ~1 month |
| DigitalOcean DOKS | Free | $12/mo | No — $200 credit, 60 days |
| Azure AKS Free tier | Free, permanent | Full node price | No |
| Google GKE | 1 free cluster/mo | Credit excludes compute | Not viable (e2-micro ≈ 1 GB RAM) |

And the free-namespace providers are gone: **Okteto Cloud shut down January 2024**;
**KubeSail shut down September 2025**. That category no longer exists.

### If you want a real cluster anyway: Oracle OKE

The only genuine $0 path — OKE **basic** clusters have no control-plane fee, and Always Free
Ampere A1 capacity can run the worker node, with a free 10 Mbps load balancer for ingress.

Go in with eyes open:

- **A credit card is required** for identity verification (not charged unless you upgrade).
- **The ARM allocation was silently halved on 15 June 2026** — 4 OCPU/24 GB → **2 OCPU/12 GB**,
  with over-limit instances terminated from 18 August 2026. No blog post; the docs were just edited.
- **Idle reclamation is live.** Oracle reclaims instances where, over 7 days, CPU p95 < 20%
  *and* network < 20% *and* memory < 20%. A low-traffic portfolio cluster fits that profile exactly.
- **A1 capacity is frequently unavailable** ("Out of host capacity") in popular regions.
- *Unverified:* basic-cluster pricing could not be confirmed on an official Oracle source —
  their pricing pages block automated fetching. Check the OCI Cost Estimator before relying on it.

**Recommendation:** treat Oracle as a learning exercise, not as where your portfolio lives.
A green CI badge proving the manifests roll out cleanly says more than a $0 cluster quietly
crashlooping because Oracle reclaimed the node for being under-utilised.

### If you want the container actually running somewhere

**Northflank Sandbox** is the best free option: **2 always-on services, explicitly no
sleeping**, deployable straight from an OCI image, free TLS and custom domains. A payment
method is mandatory at signup for abuse prevention, uncharged on the free plan.

Alternatives and why they lost: **Google Cloud Run** (free tier is real, but **1 GB/month
egress** and custom domain mapping is still Preview), **Koyeb** ($29 pre-authorisation hold),
**Render** (free web services sleep after 15 min; static bandwidth cut to 5 GB in April 2026),
**Fly.io** (**no free tier at all** since October 2024).

### Ingress: do not use ingress-nginx

**ingress-nginx was retired in March 2026** — archived read-only, no further bugfixes or CVE
patches — and its intended successor InGate was abandoned. `k8s/gateway.yaml` therefore uses
**Gateway API** (`gateway.networking.k8s.io/v1`) with cert-manager for free Let's Encrypt TLS.

Before applying it you need, in the cluster:

```sh
# 1. Gateway API CRDs
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.1/standard-install.yaml

# 2. A conformant controller — pick one, then set gatewayClassName to match
#    Envoy Gateway | NGINX Gateway Fabric | Traefik | kgateway

# 3. cert-manager with Gateway API support enabled
helm install cert-manager jetstack/cert-manager -n cert-manager --create-namespace \
  --set crds.enabled=true --set config.enableGatewayAPI=true
```

Then edit the hostname in `k8s/gateway.yaml` and `kubectl apply -f k8s/gateway.yaml`.

The `networking.k8s.io/v1` **Ingress API itself is not deprecated** — only the ingress-nginx
controller is dead. If your cluster already runs a maintained controller (F5's
`nginxinc/kubernetes-ingress`, Traefik, HAProxy), a plain Ingress still works; note that the
old `nginx.ingress.kubernetes.io/*` annotations died with the controller.

---

## 6. Contact form: email delivery

The site is static, so "send an email" has to happen without a server we own.

### WhatsApp — nothing to deploy

`wa.me` deep links are WhatsApp's official click-to-chat mechanism. No key, no
account, no backend, no cost, and no difference between localhost and production.
Nothing to configure.

### Email — Web3Forms

**Setup:** enter the destination address at <https://web3forms.com/#start>, and
the access key arrives by email. Put it in `.env` (local) and in the repo's
**Settings → Secrets and variables → Actions → Variables** as
`VITE_WEB3FORMS_KEY` (the Pages workflow reads it from `vars`).

**Why a repo *variable* and not a *secret*:** anything `VITE_`-prefixed is
inlined into the client bundle at build time and is therefore public whatever
you do. Web3Forms documents the access key as public by design — it is an alias
for an inbox, not a credential. Storing it as a secret would create a false
sense of protection while still shipping the value in `dist/assets/index-*.js`.

| Option | Free limit | Card? | Account? |
| --- | --- | --- | --- |
| **Web3Forms** ← chosen | **250 submissions/month** | No | No — email → key |
| FormSubmit.co | No published cap | No | None at all |
| EmailJS | 200 requests/month | No | Yes |
| Formspree | 50 submissions/month | No | Yes |

### Why not Firebase

Firebase looks like the obvious answer and isn't. From Firebase's own docs:

> "You can emulate functions in any Firebase project, but to deploy functions,
> your project must be on the Blaze pricing plan."

Blaze is a Google Cloud billing account, which **requires a payment method even
if you never exceed the free allowance** — and budget alerts notify, they do not
cap. The "Trigger Email from Firestore" extension is doubly disqualified: it
also requires Blaze *and* you must bring your own SMTP provider.

The card-free Firebase path — writing form submissions straight to Firestore
from the browser — sends no email at all (someone has to remember to open the
console), and since the `apiKey` ships in the bundle by design, it hands anyone
an unauthenticated write endpoint against a 20K writes/day quota.

**Firebase Hosting is genuinely free** (10 GB storage, 360 MB/day transfer,
custom domain and TLS, no card) if you'd rather host there than on GitHub Pages
or Cloudflare. Just don't use Firebase for the email.

---

## 7. What the CI/CD pipeline does

| Workflow | Trigger | Job |
| --- | --- | --- |
| `ci.yml` | push / PR | lint, typecheck, build, bundle-size report, upload artifact |
| `deploy-pages.yml` | push to `main` | build with the right base path, SPA fallback, publish to Pages |
| `publish-image.yml` | push / `v*` tag | multi-arch build → `ghcr.io`, GHA build cache |
| `k8s-validate.yml` | changes under `k8s/` | kubeconform + real rollout on kind + smoke test |

Action versions are pinned to the majors current as of August 2026 (`checkout@v7`,
`setup-node@v7`, `configure-pages@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`,
`build-push-action@v7`). Note that GitHub's *own docs* still show older majors — the docs are
stale, the versions above are from the live release API.

`upload-pages-artifact` and `deploy-pages` **must stay on matching majors** (v5 with v5).
Mixing them across the artifact boundary is the classic breakage.

---

## 8. Cost summary

**Permanently free, no credit card:**

- ✅ Live public URL with custom domain and TLS — GitHub Pages or Cloudflare
- ✅ CI/CD — GitHub Actions, unlimited on public repos
- ✅ Public Docker image — ghcr.io, unmetered
- ✅ Kubernetes manifests built, linted and actually rolled out on a real cluster in CI

**Free but requires a card on file:**

- ⚠️ A container running 24/7 at a public URL — Northflank (2 services, no sleep)
- ⚠️ A 24/7 managed Kubernetes cluster — Oracle OKE basic only, with the caveats in §5

**Not realistically free:**

- ❌ Managed Kubernetes from any mainstream provider — nodes always cost money
- ❌ A free hosted Kubernetes namespace — that category is dead
- ❌ AWS long-term for a new account — 6 months of credits, then account closure

---

## 9. Troubleshooting

**Pages deploy succeeds but the page is blank.** The base path is wrong. Open DevTools → the
asset requests will 404 under the wrong prefix. Fix `VITE_BASE` in `deploy-pages.yml`.

**`denied: installation not allowed to Create organization package`.** The workflow is
missing `permissions: packages: write`, or the repo has package creation restricted under
Settings → Actions → General → Workflow permissions.

**`docker pull` of the image 401s.** The package is still private — do the visibility step in §4.

**Pod is `CrashLoopBackOff` with an nginx permission error.** Something is writing outside
`/tmp`. The `tmp` and `nginx-cache` `emptyDir` mounts in `deployment.yaml` are mandatory with
`readOnlyRootFilesystem: true`.

**kind job fails pulling `nginxinc/nginx-unprivileged`.** Docker Hub anonymous pulls are
capped at 100 per 6 hours per IP, shared across the runner's egress. Authenticate with
`docker/login-action` against Docker Hub, or mirror the base image to ghcr.io.
