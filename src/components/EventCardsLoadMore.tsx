import { useState } from 'react';
import dayjs from 'dayjs';
import { localDateTimeToUtcString } from '@/js/util/dates.ts';
import type { EventType } from '@/types';
import styles from './EventCardsLoadMore.module.css';

type Props = {
   events: EventType[];
   perLoad: number;
};

export default function EventCardsLoadMore({ events, perLoad }: Props) {
   const [displayCount, setDisplayCount] = useState<number>(0);
   const [visibleEvents, setVisibleEvents] = useState<EventType[]>(
      events.slice(0, displayCount),
   );
   const [hasMore, setHasMore] = useState<boolean>(
      visibleEvents.length < events.length,
   );

   const loadMorePosts = async () => {
      const totalVisible = displayCount + perLoad;
      setDisplayCount(totalVisible);
      setVisibleEvents(events.slice(0, totalVisible));
      setHasMore(totalVisible < events.length);
   };

   return (
      <>
         {/* Render your current posts */}
         <div className={styles.pastEventsLoadMore}>
            {visibleEvents.map((ev) => (
               <article key={ev.id} className={styles.eventCard}>
                  <header className={styles.header}>
                     <h3 itemProp="name" className={styles.title}>
                        {ev.data.title}
                     </h3>

                     {ev.data?.image && (
                        <div className={styles.cover}>
                           <div
                              className={styles.coverBackdrop}
                              style={{
                                 backgroundImage: `url('${ev.data.image.src}')`,
                              }}
                              aria-hidden="true"
                           />

                           <a href={`/events/${ev.id}/`}>
                              <img
                                 src={ev.data.image.src}
                                 alt={ev.data.title}
                                 loading="lazy"
                              />
                           </a>
                        </div>
                     )}
                  </header>

                  <div className={styles.details}>
                     <time
                        className={styles.date}
                        dateTime={
                           ev.data.dateStart
                              ? localDateTimeToUtcString(ev.data.dateStart)
                              : ev.data.date
                        }
                     >
                        <svg
                           viewBox="0 0 857.1 1000"
                           fill="currentColor"
                           width="24"
                           height="24"
                           aria-hidden="true"
                           data-astro-cid-j3v25qam="true"
                        >
                           <path d="M500 304v250q0 7-5 12t-13 5H304q-8 0-13-5t-5-12v-36q0-8 5-13t13-5h125V304q0-8 5-13t12-5h36q8 0 13 5t5 13zm232 196q0-83-41-152T581 237t-152-41-153 41-110 111-41 152 41 152 110 111 153 41 152-41 110-111 41-152zm125 0q0 117-57 215T644 871t-215 58-216-58T58 715 0 500t58-215 155-156 216-58 215 58 156 156 57 215z"></path>
                        </svg>
                        {dayjs(ev.data.date).format('dddd MMMM D, YYYY')}
                     </time>

                     {ev.data.shortDescription && (
                        <p className={styles.summary}>
                           {ev.data.shortDescription}
                        </p>
                     )}
                  </div>

                  <footer className={styles.footer}>
                     <a
                        className={`${styles.button} ${styles.buttonSm}`}
                        href={`/events/${ev.id}/`}
                     >
                        Details{' '}
                        <svg
                           viewBox="0 0 714.3 1000"
                           fill="currentColor"
                           width="12"
                           aria-hidden="true"
                           data-astro-cid-j3v25qam="true"
                        >
                           <path d="M618 489L204 904q-11 10-25 10t-25-10l-93-93q-11-11-11-25t11-25l296-297L61 168q-11-11-11-25t11-25l93-93q10-11 25-11t25 11l414 414q10 11 10 25t-10 25z"></path>
                        </svg>
                     </a>
                  </footer>
               </article>
            ))}
         </div>

         {hasMore && (
            <div className={styles.loadMore}>
               <button className={styles.button} onClick={loadMorePosts}>
                  Load More{' '}
                  <svg
                     fill="currentColor"
                     width="18"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 642.9 1000"
                  >
                     <path d="M600 411q0 7-6 12L334 684q-5 5-13 5t-12-5L49 423q-6-5-6-12t6-13l28-28q5-6 12-6t13 6l219 219 220-219q5-6 13-6t12 6l28 28q6 5 6 13z" />
                  </svg>
               </button>
            </div>
         )}
      </>
   );
}
