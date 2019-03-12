// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


const MT = require('mark-twain');
const fs = require('fs');

module.exports = function (api) {
   api.loadSource(store => {
   // Use the Data store API here: https://gridsome.org/docs/data-store-api

      const podcastType = store.addContentType({
         typeName: 'Podcast',
         route: '/podcasts/:slug'
      });

      const eventType = store.addContentType({
         typeName: 'Event',
         route: '/events/:slug'
      });

      const playlistType = store.addContentType({
         typeName: 'Playlist'
      });

      const artistLinkType = store.addContentType({
         typeName: 'ArtistLink'
      });

      const locationType = store.addContentType({
         typeName: 'Location'
      });

      const locationHash = {},
            artistLinkHash = {},
            eventHash = {},
            podcastHash = {},
            playlistHash = {};

      fs.readdirSync('_posts/locations').forEach(file => {
         const data = MT(fs.readFileSync('_posts/locations/' + file));

         const node = locationType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: data.meta
         });

         locationHash[data.meta.title] =  node;
      });

      fs.readdirSync('_posts/artist-links').forEach(file => {
         const data = MT(fs.readFileSync('_posts/artist-links/' + file));

         const node = artistLinkType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: data.meta
         });

         artistLinkHash[data.meta.title] =  node;
      });

      fs.readdirSync('_posts/playlists').forEach(file => {
         let data = MT(fs.readFileSync('_posts/playlists/' + file));

         const node = playlistType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, data.meta)
         });



         playlistHash[data.meta.title] =  node;
      });

      fs.readdirSync('_posts/podcasts').forEach(file => {
         const data = MT(fs.readFileSync('_posts/podcasts/' + file));

         const ref = ((playlist) => {
            if (playlist && playlistHash.hasOwnProperty(playlist)) {
               return playlistHash[playlist];
            }

            return null;
         })(data.meta.playlist);

         const node = podcastType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, data.meta, {
               playlist: ref ? store.createReference(ref) : ''
            }),
         });

         podcastHash[data.meta.title] =  node.id;
      });

      fs.readdirSync('_posts/events').forEach(file => {
         const data = MT(fs.readFileSync('_posts/events/' + file));

         const playlistRef = ((playlist) => {
            if (playlist && playlistHash.hasOwnProperty(playlist)) {
               return playlistHash[playlist];
            }

            return null;
         })(data.meta.playlist);

         const locationRef = ((location) => {
            if (location && locationHash.hasOwnProperty(location)) {
               return locationHash[location];
            }

            return null;
         })(data.meta.location);

         const node = eventType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, data.meta, {
               location: locationRef ? store.createReference(locationRef) : '',
               playlist: playlistRef ? store.createReference(playlistRef) : ''
            }),
         });

         eventHash[data.meta.title] =  node.id;
      });
   });
};
