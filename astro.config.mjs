// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://aishwarya-36.github.io",
  base: ".",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});
