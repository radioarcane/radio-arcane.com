import { getEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import dayjs from 'dayjs';
import { localDateTimeToUtcString } from '@/js/util/dates';
import { getPlainText } from '@/js/util/markdown';
import type {
   Crumb,
   EventType,
   LocationType,
   PlaylistType,
   PodcastType,
} from '@/types';

type Schema = Record<string, unknown>;

type Site = {
   siteName: string;
   domain: string;
   socials: App.Locals['socials'];
};

export const defaultImage = '/img/radio-arcane.jpg';

const genre: string[] = [
   'Gothic',
   'Darkwave',
   'Post-Punk',
   'Coldwave',
   'Industrial',
   'Minimal Synth',
   'EBM',
   'Synthpop',
];

const keywords: string =
   'Gothic, Goth, Darkwave, Post-Punk, Coldwave, Minimal Synth, New Wave, Industrial, EBM, Synthpop, Synthwave, Radio Arcane, Art Sanctuary, Louisville, Kentucky, Dark Music';

const inLanguage: Schema = {
   '@type': 'Language',
   name: 'English',
   alternateName: 'en',
};

export function absoluteUrl(path: string, domain: string): string {
   return new URL(path, domain).href;
}

export async function imageUrl(
   image: ImageMetadata | null | undefined,
   domain: string,
): Promise<string> {
   if (!image) {
      return absoluteUrl(defaultImage, domain);
   }

   const img = await getImage({ src: image, format: 'jpg', width: 1200 });

   return absoluteUrl(img.src, domain);
}

export function organization(site: Site): Schema {
   return {
      '@type': 'Organization',
      name: site.siteName,
      url: site.domain,
      logo: absoluteUrl(defaultImage, site.domain),
      sameAs: Object.values(site.socials),
   };
}

export function breadcrumb(crumbs: Crumb[], domain: string): Schema {
   return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb: Crumb, index: number) => ({
         '@type': 'ListItem',
         position: index + 1,
         name: crumb.title,
         item: absoluteUrl(crumb.href, domain),
      })),
   };
}

export function locationPlace(location: LocationType): Schema {
   const { data } = location;

   const place: Schema = {
      '@type': 'Place',
      name: data.title,
      address: {
         '@type': 'PostalAddress',
         streetAddress: [data.address, data.address2]
            .filter(Boolean)
            .join(', '),
         addressLocality: data.city,
         addressRegion: data.state,
         postalCode: data.zipcode,
         addressCountry: 'US',
      },
   };

   const sameAs = [data.website, data.facebook, data.instagram].filter(Boolean);

   if (sameAs.length) {
      place.sameAs = sameAs;
   }

   if (data.mapUrl) {
      place.hasMap = data.mapUrl;
   }

   return place;
}

export async function musicEvent(
   event: EventType,
   site: Site,
): Promise<Schema> {
   const { data } = event;
   const url = absoluteUrl(`/events/${event.id}/`, site.domain);
   const lastDate = data.dateEnd || data.dateStart || data.date;
   const expired =
      dayjs().format('YYYY-MM-DD') > dayjs(lastDate).format('YYYY-MM-DD');

   const schema: Schema = {
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: data.title,
      url: url,
      description:
         data.shortDescription ||
         getPlainText(event.body, 300).trim() ||
         'Dark Eclectic Music all night featuring our rotating cast of Dark Music Specialists.',
      startDate: data.dateStart
         ? localDateTimeToUtcString(data.dateStart)
         : data.date,
      eventStatus: data.cancelled
         ? 'https://schema.org/EventCancelled'
         : 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: await imageUrl(data.image, site.domain),
      organizer: organization(site),
   };

   if (data.dateEnd) {
      schema.endDate = localDateTimeToUtcString(data.dateEnd);
   }

   if (data.facebookEventLink) {
      schema.sameAs = data.facebookEventLink;
   }

   if (data.location) {
      const location = await getEntry(data.location);

      if (location) {
         schema.location = locationPlace(location);
      }
   }

   if (data.cover || data.ticketsLink) {
      const offer: Schema = {
         '@type': 'Offer',
         availability: expired
            ? 'https://schema.org/Discontinued'
            : 'https://schema.org/InStock',
         url: data.ticketsLink || url,
      };

      if (data.cover) {
         offer.price = data.cover;
         offer.priceCurrency = 'USD';
      }

      schema.offers = offer;
   }

   return schema;
}

export function musicPlaylist(
   playlist: PlaylistType,
   site: Site,
   includeTracks: boolean = true,
): Schema {
   const tracks: Schema[] = [];

   for (const set of playlist.data.sets) {
      for (const track of set.tracks) {
         tracks.push({
            '@type': 'MusicRecording',
            byArtist: {
               '@type': 'MusicGroup',
               name: track.artist,
            },
            name: track.song,
         });
      }
   }

   const schema: Schema = {
      '@context': 'https://schema.org',
      '@type': 'MusicPlaylist',
      name: playlist.data.title,
      dateCreated: playlist.data.date,
      numTracks: tracks.length,
      genre: genre,
      keywords: `${keywords}, DJ, Playlist`,
      producer: organization(site),
   };

   if (includeTracks) {
      schema.track = tracks;
   }

   return schema;
}

export async function eventPlaylist(
   ref: EventType['data']['playlist'],
   site: Site,
): Promise<Schema | null> {
   if (!ref) {
      return null;
   }

   const playlist = await getEntry(ref);

   return playlist ? musicPlaylist(playlist, site) : null;
}

export function radioSeries(site: Site): Schema {
   return {
      '@context': 'https://schema.org',
      '@type': 'RadioSeries',
      name: site.siteName,
      url: absoluteUrl('/podcasts/', site.domain),
      sameAs: [
         site.socials.mixcloud,
         site.socials.soundcloud,
         site.socials.spotify,
         site.socials.youtube,
      ],
      description:
         'Radio Arcane is a collective of Dark Music Specialists in Louisville, KY that host events, live music and dark arts entertainment.',
      image: absoluteUrl(defaultImage, site.domain),
      isAccessibleForFree: true,
      productionCompany: organization(site),
      genre: genre,
      inLanguage: inLanguage,
      keywords: keywords,
   };
}

function mixcloudEmbedUrl(link: string): string {
   const path = new URL(link).pathname;

   return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(path)}`;
}

export async function radioEpisode(
   podcast: PodcastType,
   site: Site,
): Promise<Schema> {
   const { data } = podcast;
   const episodeNumber = parseInt(data.title, 10);
   const description = getPlainText(podcast.body)
      .split(/: Recorded|Recorded/)[0]
      .trim();

   const schema: Schema = {
      '@type': 'RadioEpisode',
      name: data.title,
      url: absoluteUrl(`/podcasts/${podcast.id}/`, site.domain),
      description: description,
      datePublished: data.date,
      image: await imageUrl(data.image, site.domain),
      inLanguage: inLanguage,
      genre: genre,
      isAccessibleForFree: true,
   };

   if (!isNaN(episodeNumber)) {
      schema.episodeNumber = episodeNumber;
      schema.position = episodeNumber;
   }

   const sameAs = [
      data.mixcloudLink,
      data.soundcloudLink,
      data.spotifyLink,
      data.youtubeLink,
   ].filter(Boolean);

   if (sameAs.length) {
      schema.sameAs = sameAs;
   }

   if (data.mixcloudLink) {
      schema.audio = {
         '@type': 'AudioObject',
         embedUrl: mixcloudEmbedUrl(data.mixcloudLink),
      };
   }

   return schema;
}

export async function podcastEpisodes(
   podcasts: PodcastType[],
   site: Site,
): Promise<Schema> {
   return {
      ...radioSeries(site),
      episode: await Promise.all(
         podcasts.map((podcast) => radioEpisode(podcast, site)),
      ),
   };
}
