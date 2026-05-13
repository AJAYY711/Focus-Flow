// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The TanStack Start plugin appends TypeScript syntax (import type, declare module)
// to routeTree.gen.js during the build. Rollup (used for SSR) treats .js files as
// plain JavaScript and rejects this. This plugin strips those constructs before Rollup
// ever parses the file, making the fix version-independent.
function stripGenFileTypeScript() {
  return {
    name: "strip-gen-file-typescript",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith(".gen.js") && /\bimport type\b/.test(code)) {
        return code
          .replace(/^import type\b.*$/gm, "")
          .replace(/^declare module\b[\s\S]*?^}/gm, "");
      }
    },
  };
}

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    tsr: {
      disableTypes: true,
    },
  },
  vite: {
    plugins: [stripGenFileTypeScript()],
  },
});
