import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/package').Config} */
const config = {
  preprocess: vitePreprocess(),
  // Read by svelte-package so `$lib` resolves in the published output.
  // No @sveltejs/kit import required — this is a plain config object.
  kit: { alias: { $lib: "src/lib" } },
};

export default config;
