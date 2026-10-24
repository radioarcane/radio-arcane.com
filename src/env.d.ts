// eslint-disable-next-line
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

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
