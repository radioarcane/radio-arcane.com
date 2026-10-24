import removeMd from 'remove-markdown';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export function getPlainText(body: unknown, limit?: number): string {
   if (typeof body === 'string') {
      const str = removeMd(body);

      return limit ? str.slice(0, limit) : str;
   }

   return '';
}

export function parse(body: string): string {
   if (typeof body === 'string') {
      const html = marked.parse(body, { async: false });
      return DOMPurify.sanitize(html);
   }

   return '';
}
