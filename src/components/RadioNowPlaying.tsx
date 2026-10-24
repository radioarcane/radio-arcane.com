import { useEffect, useState } from 'react';
import styles from './RadioNowPlaying.module.css';
import type { RadioHistoryResult, RadioHistoryResponse } from '@/types';

const baseURL = 'https://quincy.torontocast.com:1090/api/v2';
const interval = 20000;
const fallbackImgSrc =
   'https://quincy.torontocast.com:1090/media/tracks/default_track_img.png';

function getImgAlt(track: RadioHistoryResult): string {
   let alt = '';

   if (track?.album) {
      alt += `Cover artwork for "${track.album}"`;
   }

   if (track?.author) {
      alt += ` by artist: ${track.author}`;
   }

   return alt || track?.metadata || 'Unknown Track';
}

function getTrackInfo(track: RadioHistoryResult): string {
   const delimeter = ' [Requested by ';

   if (track?.author && track?.title) {
      let artist = `${track.author}`.replace(/ +(?= )/g, '').trim();
      let title = `${track.title}`.replace(/ +(?= )/g, '').trim();
      let requestName = '';

      if (title.includes(delimeter)) {
         const arr: string[] = title.split(delimeter);
         let requestStr = '';

         try {
            requestStr = arr[arr.length - 1];
            title = arr[0];
         } catch (error: unknown) {
            console.log(error);
         }

         const requestArr: string[] = requestStr.split(': ');

         try {
            requestName = requestArr[0];
         } catch (error: unknown) {
            console.log(error);
         }
      }

      if (artist === '') {
         artist = 'N/A';
      }

      if (title === '') {
         title = 'N/A';
      }

      let fullTitle = `${artist} – “${title}”`;

      if (
         requestName &&
         ['Radio:Arcane', 'RadioArcane', 'Radio Arcane'].includes(
            requestName,
         ) === false
      ) {
         fullTitle += ` ~ [Requested by ${requestName}]`;
      }

      return fullTitle;
   }

   return track?.metadata || 'Unknown Track';
}

type Props = {
   playerMode?: boolean;
};

export default function RadioNowPlaying({ playerMode = false }: Props) {
   const [currentTrack, setCurrentTrack] = useState<RadioHistoryResult | null>(
      null,
   );
   const [recentTracks, setRecentTracks] = useState<RadioHistoryResult[]>([]);
   const [init, setInit] = useState<boolean>(false);

   useEffect(() => {
      const fetchHistory = async () => {
         const params = {
            limit: '20',
            offset: '0',
            server: '1',
         };

         const url = new URL(`${baseURL}/history/`);
         url.search = new URLSearchParams(params).toString();

         try {
            const response = await fetch(url);

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: RadioHistoryResponse = await response.json();

            if (data?.results?.length) {
               const currTrack: RadioHistoryResult = data.results[0];
               setCurrentTrack(currTrack);
               setRecentTracks(data.results.slice(1));
               setInit(true);
            }
         } catch (error: unknown) {
            console.log(error);
         }
      };

      const id = setInterval(() => {
         fetchHistory();
      }, interval);

      fetchHistory();

      return () => clearInterval(id);
   }, []);

   // Add Loading

   return (
      <div className={styles.wrapper}>
         {!init && <p>Loading Playlist History ...</p>}

         {currentTrack && (
            <div className={styles.nowPlaying}>
               <p className={styles.nowPlayingInfo}>
                  <span className={styles.nowPlayingLabel}>Now Playing:</span>

                  <span className={styles.nowPlayingMeta}>
                     {getTrackInfo(currentTrack)}
                  </span>
               </p>

               <div className={styles.albumAndHistory}>
                  <div className={styles.albumCover}>
                     <img
                        src={currentTrack?.img_medium_url || fallbackImgSrc}
                        alt={getImgAlt(currentTrack)}
                        loading="lazy"
                        className="albumCoverImg"
                     />
                  </div>

                  {!playerMode && (
                     <div className={styles.history}>
                        <p>Recently Played:</p>

                        <ol className={styles.playlist}>
                           {recentTracks
                              .slice(0, 10)
                              .map((track: RadioHistoryResult) => (
                                 <li key={track.id}>{getTrackInfo(track)}</li>
                              ))}
                        </ol>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}
