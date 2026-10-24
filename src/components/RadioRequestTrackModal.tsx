import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button.tsx';
import styles from './RadioRequestTrackModal.module.css';
import type { RadioSearchResult } from '@/types';
import { radioApiURL } from '@/js/constants.ts';

type Props = {
   track: RadioSearchResult;
   onClose: () => void;
};

interface RadioRequestErrorResponse {
   all_music?: string[];
   ip_blocked?: boolean;
   detail?: string;
}

const ipBanMins = 15;
// 15 minutes between requests
const ipBanTime = ipBanMins * 60 * 1000;

function cleanStr(str: string, maxLength: number): string {
   return str
      .replace(/ +(?= )/g, '')
      .trim()
      .slice(0, maxLength);
}

function getErrorMsg(data: RadioRequestErrorResponse): string {
   if (data?.ip_blocked) {
      return `Please wait ${ipBanMins} minutes to request again.`;
   }

   if (data?.all_music?.length) {
      return `${data.all_music[0]}`;
   }

   if (data?.detail) {
      return `${data.detail}`;
   }

   return 'Sorry, an error occurred.';
}

export default function RadioRequestTrackModal({ track, onClose }: Props) {
   const [requestBy, setRequestBy] = useState<string>('');
   const [message, setMessage] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [submitted, setSubmitted] = useState<boolean>(false);
   const [errorMsg, setErrorMsg] = useState<string>('');
   const firstInputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            onClose();
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      firstInputRef.current?.focus();

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [onClose]);

   const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();

      if (loading) {
         return;
      }

      setLoading(true);
      setErrorMsg('');

      const person = cleanStr(requestBy, 50);

      const payload = {
         server_id: '1',
         person: person || 'Anonymous',
         message: cleanStr(message, 300),
         music_id: `${track.id}`,
         ip_timeout: `${ipBanTime}`,
         track_timeout: '720000',
      };

      if (person.toLowerCase() === 'vip') {
         payload.person = 'Radio:Arcane';
         payload.ip_timeout = '0';
      }

      try {
         const response = await fetch(`${radioApiURL}/track_requests/`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(payload),
         });

         if (response.ok) {
            setSubmitted(true);
            return;
         }

         // Error responses aren't guaranteed to be JSON
         const data: RadioRequestErrorResponse = await response
            .json()
            .catch(() => ({}));
         setErrorMsg(getErrorMsg(data));
      } catch (error: unknown) {
         console.error('Error making request:', error);
         setErrorMsg('Sorry, an error occurred.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={styles.modalOverlay}>
         <div className={styles.modalBackgroundClick} onClick={onClose}>
            <div
               className={styles.modal}
               role="dialog"
               aria-modal="true"
               aria-labelledby="dialog-track-request"
               onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
                  ev.stopPropagation();
               }}
            >
               <header>
                  <h3 id="dialog-track-request" className={styles.title}>
                     Track Request
                  </h3>

                  <p className={styles.trackInfo}>
                     <span>Artist:</span> {track?.author || 'N/A'}
                     <br />
                     <span>Song:</span> “{track?.title || 'N/A'}”
                  </p>

                  {errorMsg && (
                     <p className={styles.errorMsg} role="alert">
                        {errorMsg}
                     </p>
                  )}
               </header>

               {submitted ? (
                  <div className={styles.body}>
                     <p className={styles.successMsg} role="status">
                        We have received your request!
                     </p>

                     <div className={styles.actions}>
                        <Button
                           as="button"
                           size="sm"
                           type="button"
                           onClick={onClose}
                        >
                           Close
                        </Button>
                     </div>
                  </div>
               ) : (
                  <form className={styles.body} onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="requestBy">Your Name:</label>
                        <input
                           ref={firstInputRef}
                           type="text"
                           id="requestBy"
                           maxLength={50}
                           onChange={(
                              ev: React.ChangeEvent<HTMLInputElement>,
                           ) => {
                              setRequestBy(ev.currentTarget.value);
                           }}
                           value={requestBy}
                        />
                     </div>

                     <div>
                        <label htmlFor="message">
                           Shoutout:{' '}
                           <em>
                              <small>(optional message)</small>
                           </em>
                        </label>
                        <textarea
                           id="message"
                           maxLength={300}
                           rows={3}
                           onChange={(
                              ev: React.ChangeEvent<HTMLTextAreaElement>,
                           ) => {
                              setMessage(ev.currentTarget.value);
                           }}
                           value={message}
                        />
                     </div>

                     <div className={styles.actions}>
                        <Button
                           as="button"
                           size="sm"
                           type="submit"
                           disabled={loading}
                        >
                           {loading ? 'Submitting...' : 'Submit'}
                        </Button>

                        <Button
                           as="button"
                           size="sm"
                           type="button"
                           onClick={onClose}
                        >
                           Cancel
                        </Button>
                     </div>
                  </form>
               )}
            </div>
         </div>
      </div>
   );
}
