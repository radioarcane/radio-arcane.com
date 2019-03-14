// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


const MT = require('mark-twain');
const fs = require('fs');

var md = require('markdown-it')({
   html: false,
   xhtmlOut: false,
   breaks: true,
   linkify: true,
   typographer: false
});

const defaultArtistLink = {
   title: '',
   apple_music: null,
   bandcamp: null,
   facebook: null,
   google_music: null,
   instagram: null,
   soundcloud: null,
   spotify: null,
   twitter: null,
   website: null,
   youtube: null,
};

const defaultLocation = {
   title: '',
   address: null,
   address_2: null,
   city: null,
   state: null,
   zipcode: null,
   venue_link: null,
   google_map_link: null
};

const defaultEvent = {
   layout: 'event',
   title: '',
   displayTitle: '',
   event_type: null,
   date: null,
   start_datetime: null,
   end_datetime: null,
   image: null,
   description: '',
   short_description: null,
   location: null,
   facebook_event_link: null,
   tickets_link: null,
   playlist: null,
   expired: true
};

const defaultPodcast = {
   layout: 'podcast',
   title: '',
   date: null,
   description: '',
   short_description: null,
   mixcloud_link: null,
   soundcloud_link: null,
   playlist: null,
};

const defaultPlaylist = {
   layout: 'playlist',
   title: '',
   displayTitle: '',
   playlist_type: null,
   date: null,
   sets: [],
};

const defaultTrack = {
   artist: null,
   song: null,
   requestType: null,
   artistLinks: null,
};

const defaultDj = {
   dj_name: null,
   guest_dj: null,
};

const defaultPerformer = {
   performer: null,
   performerLinks: null,
};

module.exports = function (api) {
   api.loadSource(store => {
   // Use the Data store API here: https://gridsome.org/docs/data-store-api

   /*
      fs.readdirSync('_posts/events').forEach(file => {
         let data = MT(fs.readFileSync('_posts/events/' + file));

         let desc = md.render(data.meta.description).replace(/(\r\n|\n|\r)/gm, "");

         console.log(desc);

         console.log('----------------------');
      });
      */

      const locationHash = {},
            artistLinkHash = {},
            eventHash = {},
            podcastHash = {},
            playlistHash = {};

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

      fs.readdirSync('_posts/artist-links').forEach(file => {
         const data = MT(fs.readFileSync('_posts/artist-links/' + file));

         delete data.id;
         delete data.meta.id;

         const node = artistLinkType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, defaultArtistLink, data.meta)
         });

         artistLinkHash[data.meta.title] =  node;
      });

      fs.writeFileSync('static/data/artistLinks.json', JSON.stringify(artistLinkHash));

      /*
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

         fs.writeFileSync('static/data/md/' + file + '.json', JSON.stringify(data));

         const node = artistLinkType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: data.meta
         });

         artistLinkHash[data.meta.title] =  node;
      });

      fs.writeFileSync('static/data/artistLinks.json', JSON.stringify(artistLinkHash));

      fs.readdirSync('_posts/playlists').forEach(file => {
         let data = MT(fs.readFileSync('_posts/playlists/' + file));

         fs.writeFileSync('static/data/md/' + file + '.json', JSON.stringify(data));

         const node = playlistType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, data.meta)
         });

         playlistHash[data.meta.title] =  node;
      });

      fs.writeFileSync('static/data/playlists.json', JSON.stringify(playlistHash));

      fs.readdirSync('_posts/podcasts').forEach(file => {
         const data = MT(fs.readFileSync('_posts/podcasts/' + file));

         fs.writeFileSync('static/data/md/' + file + '.json', JSON.stringify(data));

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

      fs.writeFileSync('static/data/podcasts.json', JSON.stringify(podcastHash));

      fs.readdirSync('_posts/events').forEach(file => {
         const data = MT(fs.readFileSync('_posts/events/' + file));

         const data2 = MT(fs.readFileSync('_posts/events/' + file).toString());

         fs.writeFileSync('static/data/md/' + file + '-str.json', JSON.stringify(data2));

         fs.writeFileSync('static/data/md/' + file + '.json', JSON.stringify(data));

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

      fs.writeFileSync('static/data/events.json', JSON.stringify(eventHash));
      */
   });
};
