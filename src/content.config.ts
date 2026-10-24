import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import dayjs from 'dayjs';

const location = defineCollection({
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/locations' }),
   schema: z.object({
      fileName: z.string(),
      title: z.string(),
      address: z.string(),
      address2: z.optional(z.string().nullable()),
      city: z.string(),
      state: z.string(),
      zipcode: z.string(),
      mapUrl: z.optional(z.url().nullable()),
      website: z.optional(z.url().nullable()),
      facebook: z.optional(z.url().includes('facebook').nullable()),
      instagram: z.optional(z.url().includes('instagram').nullable()),
   }),
});

const playlistTypes: string[] = [
   'dead-of-night',
   'radio-arcane',
   'podcast',
   'dark-castle',
   'warped-wednesday',
   'other',
];
/*
type PlaylistTrack = {
  artist: string;
  track: string;
  request?: 'artist' | 'song' | null;
};

type DjSet = {
  djName: string
};

type Performance = {

}
*/

const playlist = defineCollection({
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/playlists' }),
   schema: z.object({
      fileName: z.string(),
      title: z.string(),
      playlistType: z.enum(playlistTypes),
      date: z.preprocess((val) => {
         if (typeof val === 'string') {
            return val;
         }

         const isDate = val instanceof Date;

         if (isDate) {
            return dayjs(val).format('YYYY-MM-DD');
         }

         return val;
      }, z.iso.date()),
      sets: z
         .array(
            z.object({
               type: z.enum(['dj', 'performance']),
               performer: z.optional(z.string()).nullable(),
               djName: z.optional(z.string().nullable()),
               tracks: z
                  .optional(
                     z.array(
                        z.object({
                           artist: z.preprocess((val) => {
                              if (typeof val === 'number') {
                                 return `${val}`;
                              }

                              return val;
                           }, z.string().default('?')),
                           song: z.preprocess((val) => {
                              if (typeof val === 'number') {
                                 return `${val}`;
                              }

                              return val;
                           }, z.string().default('?')),
                           request: z.optional(
                              z.enum(['artist', 'song']).nullable(),
                           ),
                        }),
                     ),
                  )
                  .default([]),
            }),
         )
         .default([]),
      mixcloudLinks: z.optional(
         z.array(
            z.object({
               url: z.optional(z.url()),
            }),
         ),
      ),
   }),
});

const event = defineCollection({
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/events' }),
   schema: ({ image }) =>
      z.object({
         eventType: z.string(),
         fileName: z.string(),
         title: z.string(),
         image: z.optional(image().nullable()),
         cancelled: z.boolean().default(false),
         date: z.preprocess((val) => {
            if (typeof val === 'string') {
               return val;
            }

            const isDate = val instanceof Date;

            if (isDate) {
               return dayjs(val).format('YYYY-MM-DD');
            }

            return val;
         }, z.iso.date()),
         dateStart: z.optional(
            z.preprocess(
               (val) => {
                  if (typeof val === 'string') {
                     return val;
                  }

                  const isDate = val instanceof Date;

                  if (isDate) {
                     return dayjs(val).format('YYYY-MM-DDTHH:mm:ss');
                  }

                  return val;
               },
               z.iso.datetime({ local: true }).nullable(),
            ),
         ),
         dateEnd: z.optional(
            z.preprocess(
               (val) => {
                  if (typeof val === 'string') {
                     return val;
                  }

                  const isDate = val instanceof Date;

                  if (isDate) {
                     return dayjs(val).format('YYYY-MM-DDTHH:mm:ss');
                  }

                  return val;
               },
               z.iso.datetime({ local: true }).nullable(),
            ),
         ),
         location: z.optional(reference('location').nullable()),
         playlist: z.optional(reference('playlist').nullable()),
         ticketPrice: z.optional(z.string().nullable()),
         cover: z.optional(z.string().nullable()),
         ticketsLink: z.optional(z.url().nullable()),
         facebookEventLink: z.optional(z.url().includes('facebook').nullable()),
         shortDescription: z.optional(z.string().nullable()),
      }),
});

const mix = defineCollection({
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/mixes' }),
   schema: z.object({
      fileName: z.string(),
      title: z.string(),
      date: z.preprocess((val) => {
         if (typeof val === 'string') {
            return val;
         }

         const isDate = val instanceof Date;

         if (isDate) {
            return dayjs(val).format('YYYY-MM-DD');
         }

         return val;
      }, z.iso.date()),
      mixcloudLink: z.optional(z.string().nullable()),
      cover: z.optional(z.url().nullable()),
   }),
});

const podcast = defineCollection({
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/podcasts' }),
   schema: ({ image }) =>
      z.object({
         fileName: z.string(),
         title: z.string(),
         image: z.optional(image().nullable()),
         date: z.preprocess((val) => {
            if (typeof val === 'string') {
               return val;
            }

            const isDate = val instanceof Date;

            if (isDate) {
               return dayjs(val).format('YYYY-MM-DD');
            }

            return val;
         }, z.iso.date()),
         mixcloudLink: z.optional(z.url().nullable()),
         soundcloudLink: z.optional(z.url().nullable()),
         spotifyLink: z.optional(z.url().nullable()),
         youtubeLink: z.optional(z.url().nullable()),
         playlist: z.optional(reference('playlist').nullable()),
      }),
});

const affiliate = defineCollection({
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/affiliates' }),
   schema: z.object({
      fileName: z.string(),
      title: z.string(),
      affiliates: z
         .array(
            z.object({
               name: z.string(),
               body: z.string().nullable().optional(),
               website: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
               facebook: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
               instagram: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
               tiktok: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
               youtube: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
               bandcamp: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
               soundcloud: z.preprocess(
                  (val) => (val === '' ? null : val),
                  z.url().nullable().optional(),
               ),
            }),
         )
         .default([]),
   }),
});

export const collections = {
   event,
   location,
   playlist,
   mix,
   podcast,
   affiliate,
};
