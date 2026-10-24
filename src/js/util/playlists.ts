import { getCollection } from 'astro:content';
import orderBy from 'lodash/orderBy';
import type { PlaylistType } from '@/types';

/* Number of playlists rendered per chunk on the infinite loading playlists page */
export const PLAYLISTS_PER_PAGE = 10;

/* Path of the prebuilt partial that holds a given chunk of playlists */
export const playlistsPartialPath = (page: number): string =>
   `/playlists/partials/${page}/`;

export async function getSortedPlaylists(): Promise<PlaylistType[]> {
   const allPlaylists: PlaylistType[] = await getCollection(
      'playlist',
      (_item: PlaylistType) => {
         // Added to possibly add filter here in future...
         return true;
      },
   );

   return orderBy(
      allPlaylists,
      (item: PlaylistType) => {
         return item.data.date;
      },
      ['desc'],
   );
}
