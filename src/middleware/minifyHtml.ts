import { defineMiddleware } from 'astro/middleware';
import { minify } from 'html-minifier';

export const minifyHtml = defineMiddleware(async (_, next) => {
   const response = await next();
   const html = await response.text();

   try {
      const minifiedHtml = minify(html, {
         caseSensitive: true,
         collapseInlineTagWhitespace: false,
         collapseWhitespace: true,
         continueOnParseError: false,
         decodeEntities: false,
         keepClosingSlash: false,
         minifyCSS: true,
         minifyJS: true,
         preserveLineBreaks: false,
         removeAttributeQuotes: false,
         removeEmptyAttributes: false,
         removeEmptyElements: false,
         removeOptionalTags: false,
         removeRedundantAttributes: false,
         removeScriptTypeAttributes: false,
         removeStyleLinkTypeAttributes: false,
      });

      return new Response(minifiedHtml, {
         status: 200,
         headers: response.headers,
      });
   } catch (err: unknown) {
      if (err && Object.hasOwn(err, 'message')) {
         console.log('Minification error');
         // console.log(err.message.toString().slice(0, 200) + "...");
      }

      return next();
   }
});
