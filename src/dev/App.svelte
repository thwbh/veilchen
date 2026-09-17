<script lang="ts">
  import type { Component } from "svelte";

  // Reuse the existing (SvelteKit-style) demo pages as plain components.
  // Vite's import.meta.glob works in both dev and build.
  const modules = import.meta.glob("../routes/**/+page.svelte") as Record<
    string,
    () => Promise<{ default: Component }>
  >;

  const routes: Record<string, () => Promise<{ default: Component }>> = {};
  for (const [file, loader] of Object.entries(modules)) {
    const path =
      file.replace("../routes", "").replace(/\/\+page\.svelte$/, "") || "/";
    routes[path] = loader;
  }

  function normalize(p: string): string {
    const trimmed = p.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  }

  let current = $state(normalize(location.pathname));
  const page = $derived((routes[current] ?? routes["/"])());

  function handleClick(event: MouseEvent) {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !href.startsWith("/") || anchor.target === "_blank") return;
    event.preventDefault();
    const path = normalize(href);
    if (path !== current) {
      history.pushState({}, "", href);
      current = path;
    }
  }
</script>

<svelte:window onpopstate={() => (current = normalize(location.pathname))} />
<svelte:document onclick={handleClick} />

{#await page then module}
  {@const Page = module.default}
  <Page />
{/await}
