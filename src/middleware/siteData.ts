import { defineMiddleware } from 'astro/middleware';

export const siteData = defineMiddleware(({ locals }, next) => {
   locals.siteName = 'Radio Arcane';
   locals.domain = 'https://www.radio-arcane.com';

   locals.socials = {
      facebook: 'https://www.facebook.com/RadioArcaneEvents',
      instagram: 'https://www.instagram.com/radio_arcane',
      x: 'https://x.com/Radio_Arcane',
      youtube: 'https://www.youtube.com/@RadioArcane',
      twitch: 'https://www.twitch.tv/radio_arcane_tv',
      mixcloud: 'https://www.mixcloud.com/Radio-Arcane',
      spotify: 'https://open.spotify.com/show/1agKdqPjtH92Gw33dcLbS1',
      soundcloud: 'https://soundcloud.com/radio_arcane/',
      tiktok: 'https://www.tiktok.com/@radio.arcane',
      linktree: 'https://linktr.ee/radioarcane',
      discord: 'https://discord.gg/FBSpPhfGc9',
   };

   locals.radioStreamURL = 'https://quincy.torontocast.com:1100/stream';

   return next();
});
