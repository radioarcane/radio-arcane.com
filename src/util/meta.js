import config from '~/config.js';

const meta = function({
   title,
   description,
   image,
   path,
   titleTemplate,
   jsonLdSchema
}) {
   const metaTitle = title || config.siteName;
   const metaDescription = description || '';
   const metaUrl = path ? `${ config.siteUrl }${ path }` : config.siteUrl;

   const metaImage = (() => {
      if (image) {
         return `${ config.siteUrl }${ image }`;
      }

      return `${ config.siteUrl }${ config.defaultMetaImg }`;
   })();

   const metaData = {
      title: metaTitle,
      titleTemplate: titleTemplate || config.titleTemplate,
      meta: [
         { name: 'description', content: metaDescription, key: 'description' },

         { property: 'og:title', content: metaTitle, key: 'ogTitle' },
         { property: 'og:site_name', content: config.siteName, key: 'ogSite' },
         { property: 'og:url', content: metaUrl, key: 'ogUrl' },
         { property: 'og:image', content: metaImage, key: 'ogImg' },
         { property: 'og:description', content: metaDescription, key: 'ogDesc' },

         { name: 'twitter:card', content: 'summary' },
         { name: 'twitter:site', content: metaUrl, key: 'twUrl' },
         { name: 'twitter:title', content: metaTitle, key: 'twTitle' },
         { name: 'twitter:description', content: metaDescription, key: 'twDesc' },
         { name: 'twitter:creator', content: config.twitterHandle },
         { name: 'twitter:image', content: metaImage, key: 'twImg' },

         { itemprop: 'name', content: metaTitle, key: 'itemTitle' },
         { itemprop: 'description', content: metaDescription, key: 'itemDesc' },
         { itemprop: 'image', content: metaImage, key: 'itemImg' },
      ],
      links: [
         { rel: 'canonical', href: metaUrl, key: 'canonical' }
     ]
   };

   if (jsonLdSchema) {
      metaData.script =  [{
         type: 'application/ld+json',
         vmid: 'ldjson-schema',
         key: 'ldjsonSchema',
         body: true,
         innerHTML: JSON.stringify(jsonLdSchema)
      }];

      metaData.__dangerouslyDisableSanitizersByTagID = {
         'ldjson-schema': ['innerHTML']
      };
   }

   return metaData;
};

export default meta;
