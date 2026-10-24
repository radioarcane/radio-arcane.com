import { type CollectionEntry } from 'astro:content';
export type Crumb = {
   href: string;
   title: string;
};

export interface DjSet {
   type: 'dj';
   djName: string;
   tracks: PlaylistTrack[];
}

export interface PerformerSet {
   type: 'performance';
   performer: string;
}

export type PlaylistSet = DjSet | PerformerSet;

export interface PlaylistTrack {
   artist: string;
   song: string;
   request?: 'artist' | 'song';
}

export type EventType = CollectionEntry<'event'>;
export type LocationType = CollectionEntry<'location'>;

export type PlaylistType = CollectionEntry<'playlist'>;

export type PodcastType = CollectionEntry<'podcast'>;

export type MixType = CollectionEntry<'mix'>;
export type MixcloudLink = {
   url?: string;
};

export type AffiliateCollectionType = CollectionEntry<'affiliate'>;

export type Affiliate = {
   name: string;
   body?: string | null;
   website?: string | null;
   facebook?: string | null;
   instagram?: string | null;
   tiktok?: string | null;
   youtube?: string | null;
   bandcamp?: string | null;
   soundcloud?: string | null;
};

export interface RadioHistoryResult {
   id: number;
   img_url: string | null;
   img_medium_url: string | null;
   img_large_url: string | null;
   metadata: string;
   ts: number;
   length: number;
   author: string | null;
   title: string | null;
   album: string | null;
}

export interface RadioHistoryResponse {
   count: number;
   next: string | null;
   previous: string | null;
   results: RadioHistoryResult[];
}

export interface RadioSearchResult {
   id: number;
   filename: string;
   meta: string;
   public_path: string;
   path: string;
   has_waveform: boolean;
   author: string | null;
   title: string | null;
   album: string | null;
   genre: string | null;
   year: string | null;
   length: number;
   samplerate: number;
   audio_format: number;
   requestable: boolean;
   requests_number: number;
   auto_up: number;
   auto_down: number;
   server: number;
   tag_image: string | null;
   image_medium: string | null;
   image_large: string | null;
}

export interface RadioSearchResponse {
   count: number;
   next: string | null;
   previous: string | null;

   results: RadioSearchResult[];
}
