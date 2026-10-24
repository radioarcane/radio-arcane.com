import { useEffect, useRef, useState } from 'react';
import Pagination from '@rc-component/pagination';
import enUS from '@rc-component/pagination/locale/en_US';
import Button from '@/components/Button.tsx';
import styles from './RadioRequestTrack.module.css';
import type { RadioSearchResult, RadioSearchResponse } from '@/types';
import { radioFallbackCoverImgSrc, radioApiURL } from '@/js/constants.ts';
import RadioRequestTrackModal from './RadioRequestTrackModal.tsx';
import { FaAngleRight, FaAngleLeft, FaEllipsisH } from 'react-icons/fa';

function getImgAlt(track: RadioSearchResult): string {
   let alt = '';

   if (track?.album) {
      alt += `Cover artwork for "${track.album}"`;
   }

   if (track?.author) {
      alt += ` by artist: ${track.author}`;
   }

   return alt || track?.meta || 'Unknown Track';
}

type Props = {
   perPage?: number;
};

export default function RadioRequestTrack({ perPage }: Props) {
   const [init, setInit] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(true);
   const [fetchError, setFetchError] = useState<boolean>(false);
   const [query, setQuery] = useState<string>('');
   const [debouncedQuery, setDebouncedQuery] = useState<string>('');
   const [results, setResults] = useState<RadioSearchResult[]>([]);

   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalItems, setTotalItems] = useState<number>(0);
   const [itemsPerPage] = useState<number>(
      perPage && perPage > 0 ? perPage : 24,
   );

   const [requestTrack, setRequestTrack] = useState<RadioSearchResult | null>(
      null,
   );
   const resultsRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedQuery(query.replace(/ +(?= )/g, '').trim());
      }, 500);

      return () => clearTimeout(timer);
   }, [query]);

   useEffect(() => {
      // Abort stale requests so an older response can't overwrite a newer one
      const controller = new AbortController();

      const fetchData = async () => {
         const params: Record<string, string> = {
            limit: `${itemsPerPage}`,
            offset: `${(currentPage - 1) * itemsPerPage}`,
            order: '1',
            requestable: 'true',
            server: '1',
            with_tags_only: 'true',
         };

         if (debouncedQuery) {
            params.search_q = debouncedQuery;
         }

         const url = new URL(`${radioApiURL}/music/`);
         url.search = new URLSearchParams(params).toString();

         setLoading(true);

         try {
            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: RadioSearchResponse = await response.json();
            const total = Number(data?.count) || 0;

            setResults(data?.results || []);
            setTotalItems(total);
            setFetchError(false);

            if (
               currentPage > 1 &&
               currentPage > Math.ceil(total / itemsPerPage)
            ) {
               setCurrentPage(1);
            }
         } catch (error: unknown) {
            if (controller.signal.aborted) {
               return;
            }

            console.error('Error fetching data:', error);
            setResults([]);
            setTotalItems(0);
            setFetchError(true);
         }

         setLoading(false);
         setInit(true);
      };

      fetchData();

      return () => controller.abort();
   }, [debouncedQuery, currentPage, itemsPerPage]);

   const resetSearch = () => {
      setQuery('');
      setDebouncedQuery('');
      setCurrentPage(1);
   };

   return (
      <div className={styles.wrapper}>
         {!init && <p>Loading Available Songs ...</p>}

         {init && (
            <div className={styles.search}>
               <input
                  type="text"
                  placeholder="Search Artist or Song..."
                  aria-label="Search Artist or Song"
                  maxLength={80}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                     setQuery(ev.currentTarget.value);
                     setCurrentPage(1);
                  }}
                  value={query}
               />
            </div>
         )}

         {init && fetchError && (
            <p>
               Sorry, the track list could not be loaded. Please try again
               later.
            </p>
         )}

         {init && !loading && !fetchError && results.length === 0 && (
            <div className={styles.noResults}>
               <p>
                  No Tracks Found{' '}
                  {debouncedQuery.length > 0 && (
                     <span>
                        for query <u>{debouncedQuery}</u>.
                     </span>
                  )}
               </p>

               {debouncedQuery.length > 0 && (
                  <Button as="button" size="sm" onClick={resetSearch}>
                     Reset
                  </Button>
               )}
            </div>
         )}

         <div
            ref={resultsRef}
            className={`${styles.grid} ${loading && init ? styles.gridLoading : ''}`}
            aria-busy={loading}
         >
            {results.map((item: RadioSearchResult) => (
               <div
                  key={item.id}
                  className={styles.requestTrack}
                  data-id={item.id}
               >
                  <div className={styles.cover}>
                     <img
                        src={item?.image_medium || radioFallbackCoverImgSrc}
                        alt={getImgAlt(item)}
                        loading="lazy"
                     />
                  </div>

                  <p className={styles.trackInfo}>
                     <span className={styles.trackArtist}>
                        {item?.author || 'N/A'}
                     </span>
                     <span className={styles.trackSong}>
                        {item?.title || 'N/A'}
                     </span>
                  </p>

                  <div className={styles.request}>
                     <Button
                        as="button"
                        size="sm"
                        aria-haspopup="dialog"
                        title={`Request song “${item?.meta}”`}
                        onClick={() => {
                           setRequestTrack(item);
                        }}
                     >
                        Request
                     </Button>
                  </div>
               </div>
            ))}
         </div>

         {totalItems > itemsPerPage && (
            <div className={styles.pagination}>
               <Pagination
                  current={currentPage}
                  total={totalItems}
                  pageSize={itemsPerPage}
                  showSizeChanger={false}
                  locale={enUS}
                  onChange={(current: number) => {
                     setCurrentPage(current);
                     resultsRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                     });
                  }}
                  nextIcon={
                     <div className={styles.paginationNextIcon}>
                        <FaAngleRight fill="currentColor" />
                     </div>
                  }
                  prevIcon={
                     <div className={styles.paginationPrevIcon}>
                        <FaAngleLeft fill="currentColor" />
                     </div>
                  }
                  jumpNextIcon={
                     <div className={styles.paginationJumpIcon}>
                        <FaEllipsisH fill="currentColor" />
                     </div>
                  }
                  jumpPrevIcon={
                     <div className={styles.paginationJumpIcon}>
                        <FaEllipsisH fill="currentColor" />
                     </div>
                  }
               />
            </div>
         )}

         {requestTrack && (
            <RadioRequestTrackModal
               track={requestTrack}
               onClose={() => {
                  setRequestTrack(null);
               }}
            />
         )}
      </div>
   );
}
