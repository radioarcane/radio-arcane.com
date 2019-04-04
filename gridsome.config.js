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
   siteUrl: 'https://www.radio-arcane.com',
   siteDescription: 'Louisville, KY collective specializing in Darkwave, Goth, Post-Punk, Industrial, EBM, Synthwave, and related music events & podcasts.',
   titleTemplate: '%s | Radio Arcane',
   chainWebpack: config => {
      // Load variables for all vue-files
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

      types
      .forEach(type => addStyleResource(config.module.rule('scss')
      .oneOf(type)));

      const svgRule = config.module.rule('svg');

      svgRule.uses.clear();

      svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
   },
   plugins: [
      {
         use: '@gridsome/plugin-sitemap',
         options: {
            cacheTime: 600000,
            exclude: [],
            config: {
               '/': {
                  changefreq: 'weekly',
                  priority: 1.0
               },
               '/events': {
                  changefreq: 'weekly',
                  priority: 0.9
               },
               '/events/*': {
                  changefreq: 'weekly',
                  priority: 0.8
               },
               '/podcasts': {
                  changefreq: 'weekly',
                  priority: 0.7
               },
               '/podcasts/*': {
                  changefreq: 'monthly',
                  priority: 0.6
               },
               '/arcane-alive': {
                  changefreq: 'monthly',
                  priority: 0.5
               },
               '/about': {
                  changefreq: 'monthly',
                  priority: 0.4
               }
            }
         }
      }
   ]
};
