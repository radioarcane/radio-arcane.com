// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path');

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
				path.resolve(__dirname, './src/assets/styles/_globals.scss'),
				// you can also use a glob if you'd prefer
				// path.resolve(__dirname, './src/assets/sass/*.sass'),
      ],
   });
}

module.exports = {
   siteName: 'Radio Arcane',
   titleTemplate: '%s | Radio Arcane',
   chainWebpack: config => {
      // Load variables for all vue-files
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

      types
      .forEach(type => addStyleResource(config.module.rule('scss')
      .oneOf(type)));

      /*
      const svgRule = config.module.rule('svg');

      svgRule.uses.clear();

      svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
      */

      const svgRule = config.module.rule('vue');

      svgRule
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader');
   },
   transformers: {
      remark: {
         externalLinksTarget: '_blank',
         externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
         anchorClassName: '',
         plugins: [
         ]
      }
   },

   plugins: [
   //   {
   //      use: '@gridsome/source-filesystem',
   //      options: {
   //         path: '_posts/tests/**/*.md',
   //         typeName: 'Test',
   //         index: ['README', 'index'],
   //         remark: {
   //            plugins: [],
   //            externalLinksTarget: '_blank',
   //            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
   //            anchorClassName: '',
   //         }
      //   }
      //},
      {
         use: '@gridsome/source-filesystem',
         options: {
            path: '_posts/artist-links/**/*.md',
            typeName: 'ArtistLink',
            index: ['README', 'index'],
            //remark: {
            //   plugins: []
            //}
         }
      },
      {
         use: '@gridsome/source-filesystem',
         options: {
            path: '_posts/locations/**/*.md',
            typeName: 'Location',
            index: ['README', 'index'],
            //remark: {
            //   plugins: []
            //}
         }
      },
      {
         use: '@gridsome/source-filesystem',
         options: {
            path: '_posts/playlists/**/*.md',
            typeName: 'Playlist',
            index: ['README', 'index'],
            //remark: {
            //   plugins: []
         //   }
         }
      },
      {
         use: '@gridsome/source-filesystem',
         options: {
            path: '_posts/podcasts/**/*.md',
            typeName: 'Podcast',
            index: ['README', 'index'],
            route: '/podcasts/:slug',
            refs: {
               playlist: {
                  typeName: 'Playlist',
                  create: false
               }
            },
            //remark: {
            //   plugins: []
            //}
         }
      },
      {
         use: '@gridsome/source-filesystem',
         options: {
            path: '_posts/events/**/*.md',
            typeName: 'Event',
            index: ['README', 'index'],
            route: '/events/:slug',
            refs: {
               location: {
                  typeName: 'Location',
                  create: false
               },
               playlist: {
                  typeName: 'Playlist',
                  create: false
               }
            },
            //remark: {
            //   plugins: []
            //}
         }
      }
   ]
};
