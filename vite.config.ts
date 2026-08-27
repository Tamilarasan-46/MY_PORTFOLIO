import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === "serve"

  return {
    /**
     * Relative base keeps one build portable across every target:
     *   - GitHub Pages project page  (https://user.github.io/repo/)
     *   - Docker / nginx at the root (https://example.com/)
     *   - Cloudflare Pages / Netlify (https://example.pages.dev/)
     * Override with VITE_BASE when a target needs an absolute path.
     */
    // `||` not `??`: an env var that is declared-but-empty in CI must still
    // fall back to the default rather than becoming base: "".
    base: process.env.VITE_BASE || "./",

    // The inspector rewrites JSX with debug attributes — dev only.
    plugins: [...(isDev ? [inspectAttr()] : []), react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      port: 5173,
      host: true,
    },

    preview: {
      port: 4173,
      host: true,
    },

    build: {
      outDir: "dist",
      sourcemap: false,
      target: "es2020",
      cssCodeSplit: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          // Split the framework out so content edits don't bust the vendor cache.
          // Matching on the resolved module path, not the bare package name:
          // the runtime is reached via `react-dom/client`, a different module
          // id, so a `{ react: ["react-dom"] }` map silently misses it and
          // leaves react-dom in the app chunk.
          manualChunks(id) {
            if (/node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) return "react"
            if (/node_modules[/\\]lucide-react[/\\]/.test(id)) return "icons"
          },
        },
      },
    },
  }
})
