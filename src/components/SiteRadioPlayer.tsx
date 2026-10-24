import { useEffect, useState, createRef } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import styles from './SiteRadioPlayer.module.css';
import type { RadioHistoryResult, RadioHistoryResponse } from '@/types';
import {
   radioStreamURL,
   radioApiURL,
   radioFallbackCoverImgSrc,
} from '@/js/constants';

const interval = 20000;

function getImgAlt(track: RadioHistoryResult): string {
   let alt = '';

   if (track?.album) {
      alt += `Cover artwork for "${track.album}"`;
   }

   if (track?.author) {
      alt += ` by artist: ${track.author}`;
   }

   return alt || 'Unknown Track';
}

export default function SiteRadioPlayer() {
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const audioRef = createRef<HTMLAudioElement>();
   const [currentTrack, setCurrentTrack] = useState<RadioHistoryResult | null>(
      null,
   );
   // Track info is optional: if the history API fails, still show the bar so the stream can play
   const hasTrackInfo = Boolean(
      (currentTrack?.author && currentTrack?.title) || currentTrack?.metadata,
   );

   useEffect(() => {
      const fetchHistory = async () => {
         const params = {
            limit: '2',
            offset: '0',
            server: '1',
         };
         const url = new URL(`${radioApiURL}/history/`);
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

   const togglePlay = (): void => {
      if (audioRef?.current !== null) {
         if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = '';
            audioRef.current.load();
         } else {
            audioRef.current.src = `${radioStreamURL}`;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
         }

         setIsPlaying(!isPlaying);
      }
   };

   return (
      <div
         className={`${styles.siteAudioPlayer} ${styles.siteAudioPlayerVisible}`}
      >
         <div className={styles.wrapper}>
            <audio ref={audioRef} />

            <div className={styles.nowPlaying}>
               <div className={styles.albumCover}>
                  <img
                     src={
                        currentTrack?.img_medium_url || radioFallbackCoverImgSrc
                     }
                     alt={currentTrack ? getImgAlt(currentTrack) : ''}
                     loading="lazy"
                     className={styles.albumCoverImg}
                  />
               </div>

               <div className={styles.nowPlayingInfo}>
                  <span className={styles.nowPlayingLabel}>
                     {isPlaying && <span className={styles.liveDot} />}
                     {hasTrackInfo ? 'Now Playing' : 'Live 24/7'}
                  </span>

                  <span className={styles.nowPlayingMeta}>
                     {currentTrack?.author && currentTrack?.title && (
                        <>
                           <span className={styles.nowPlayingArtist}>
                              {currentTrack.author}
                           </span>
                           <span className={styles.nowPlayingSong}>
                              {currentTrack.title}
                           </span>
                        </>
                     )}

                     {(!currentTrack?.author || !currentTrack?.title) &&
                        currentTrack?.metadata && (
                           <span className={styles.nowPlayingArtist}>
                              {currentTrack.metadata}
                           </span>
                        )}

                     {!hasTrackInfo && (
                        <span className={styles.nowPlayingArtist}>
                           Streaming Radio
                        </span>
                     )}
                  </span>
               </div>

               <button
                  onClick={togglePlay}
                  title={isPlaying ? 'Stop' : 'Listen to Streaming Radio'}
                  aria-label={isPlaying ? 'Stop' : 'Listen to Streaming Radio'}
                  className={`${styles.button} ${isPlaying ? styles.buttonPlaying : ''}`}
               >
                  {isPlaying && <FaStop size={14} />}

                  {!isPlaying && <FaPlay size={14} />}
               </button>
            </div>
         </div>
      </div>
   );
}
