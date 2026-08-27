# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 — build the static bundle
#
# --platform=$BUILDPLATFORM pins this stage to the NATIVE architecture of the
# builder. The output is architecture-independent static files, so without this
# a multi-arch build would run the whole npm ci + tsc + vite pipeline a second
# time under QEMU emulation — minutes of pointless work per build.
# ---------------------------------------------------------------------------
FROM --platform=$BUILDPLATFORM node:24-alpine AS build

WORKDIR /app

# Install deps first so the layer caches across source-only changes.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY . .

# Served from the domain root inside the container.
ENV VITE_BASE=/
# Public by construction: anything VITE_-prefixed is inlined into the client
# bundle, so these are build args rather than secrets.
ARG VITE_WEB3FORMS_KEY=""
ARG VITE_CONTACT_ENDPOINT=""
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
ENV VITE_CONTACT_ENDPOINT=$VITE_CONTACT_ENDPOINT

RUN npm run build


# ---------------------------------------------------------------------------
# Stage 2 — serve it
#
# nginx-unprivileged runs as uid 101, listens on 8080 and keeps every writable
# path under /tmp, so the container works with readOnlyRootFilesystem: true.
# Its own ENTRYPOINT/CMD/USER/EXPOSE are already correct — nothing to restate.
# ---------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:1.31-alpine AS runtime

LABEL org.opencontainers.image.title="tamilarasan-portfolio" \
      org.opencontainers.image.description="Portfolio site — Tamilarasan M, Software Developer" \
      org.opencontainers.image.licenses="MIT"

COPY deploy/security-headers.conf /etc/nginx/security-headers.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null 2>&1 || exit 1
