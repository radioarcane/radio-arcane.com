// eslint-disable-next-line
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Unique per build, injected via Vite `define` in astro.config.mjs
declare const __BUILD_ID__: string;

declare namespace App {
   interface Locals {
      siteName: string;
      domain: string;
      socials: {
         facebook: string;
         instagram: string;
         x: string;
         youtube: string;
         twitch: string;
         mixcloud: string;
         spotify: string;
         soundcloud: string;
         tiktok: string;
         linktree: string;
         discord: string;
      };

      radioStreamURL: string;
   }
}
