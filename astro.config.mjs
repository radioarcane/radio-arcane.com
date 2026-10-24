// @ts-check
import { defineConfig } from 'astro/config';
/* import astroBrokenLinkChecker from 'astro-broken-link-checker'; */
import sitemap from '@astrojs/sitemap';
import Critters from 'astro-critters';
import { targetBlank } from './src/scripts/targetBlank.ts';
import { unified } from '@astrojs/markdown-remark';
import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

const domain = 'https://www.radio-arcane.com';

/* Redirect pages and misc. */
const siteMapIgnore = ['/404.html'].map((path) => {
   return `${domain}${path}`;
});

const siteMap = sitemap({
   filter: (page) => {
      // Playlist partials are HTML fragments fetched by /playlists, not standalone pages
      return (
         siteMapIgnore.includes(page) === false &&
         !page.startsWith(`${domain}/playlists/partials/`)
      );
   },
});

// https://astro.build/config
export default defineConfig({
   site: domain,
   output: 'static',
   devToolbar: {
      enabled: false,
   },
   adapter: netlify(),
   integrations: [
      Critters({
         // Playlist partials have no <head> to inline CSS into
         Exclude: [
            (file) => file.replace(/\\/g, '/').includes('/playlists/partials/'),
         ],
      }),
      siteMap,
      react(),
   ],
   vite: {
      define: {
         // Lets the client router detect a new deploy and do a full page load
         __BUILD_ID__: JSON.stringify(process.env.DEPLOY_ID || Date.now().toString()),
      },
      resolve: {
         // Its ESM build uses extensionless imports that Node can't resolve, so let Vite bundle it
         noExternal: ['@rc-component/pagination'],
      },
   },
   markdown: {
      processor: unified({
         rehypePlugins: [[targetBlank, { domain: domain }]],
         gfm: true,
         smartypants: true,
      }),
   },
});
