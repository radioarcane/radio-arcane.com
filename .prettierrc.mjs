/** @type {import("prettier").Config} */
export default {
   singleQuote: true,
   tabWidth: 3,
   plugins: ['prettier-plugin-astro'],
   overrides: [
      {
         files: '*.astro',
         options: {
            parser: 'astro',
         },
      },
      {
         files: ['*.json', '*.webmanifest', '*.yml', '*.yaml', '*.md'],
         options: {
            tabWidth: 2,
         },
      },
   ],
};
