// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


const MT = require('mark-twain');
const fs = require('fs');

const slugify = require('slugify');
const moment = require('moment');

const md = require('markdown-it')({
   html: false,
   xhtmlOut: false,
   breaks: true,
   linkify: true,
   typographer: false
});

const defaultArtistLink = {
   title: null,
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
   title: null,
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
   title: null,
   display_name: null,
   event_type: null,
   date: null,
   start_datetime: null,
   end_datetime: null,
   image: null,
   webpImage: null,
   description: null,
   short_description: null,
   location: null,
   facebook_event_link: null,
   tickets_link: null,
   playlist: null,
   expired: true
};

const defaultPodcast = {
   layout: 'podcast',
   title: null,
   display_name: null,
   image: null,
   webpImage: null,
   date: null,
   description: null,
   short_description: null,
   mixcloud_link: null,
   soundcloud_link: null,
   playlist: null,
};

const defaultPlaylist = {
   layout: 'playlist',
   title: null,
   display_name: null,
   playlist_type: null,
   date: null,
   sets: [],
};

const defaultTrack = {
   artist: null,
   song: null,
   request: null,
   artist_links: null,
};

const defaultDj = {
   dj_name: null,
   guest_dj: null,
   tracks: [],
};

const defaultPerformer = {
   performer: null,
   performer_links: null,
};

module.exports = function (api) {
   api.loadSource(store => {
   // Use the Data store API here: https://gridsome.org/docs/data-store-api

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
         typeName: 'Playlist',
         route: '/playlists/:slug'
      });

      const artistLinkType = store.addContentType({
         typeName: 'ArtistLink'
      });

      const locationType = store.addContentType({
         typeName: 'Location'
      });

      fs.readdirSync('_posts/artist-links').forEach(file => {
         const data = MT(fs.readFileSync('_posts/artist-links/' + file));

         const node = artistLinkType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, defaultArtistLink, data.meta)
         });

         artistLinkHash[slugify(data.meta.title)] =  node;
      });

      fs.readdirSync('_posts/locations').forEach(file => {
         let data = MT(fs.readFileSync('_posts/locations/' + file));

         const node = locationType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, defaultLocation, data.meta)
         });

         locationHash[slugify(data.meta.title)] =  node;
      });

      fs.readdirSync('_posts/playlists').forEach(file => {
         let data = MT(fs.readFileSync('_posts/playlists/' + file));
         let playlist = Object.assign({}, defaultPlaylist, data.meta);

         const sets = playlist.sets.map(setList => {
            let thisSet = Object.assign({}, setList);

            if (thisSet.hasOwnProperty('type') && thisSet.type === 'dj_set') {
               thisSet = Object.assign({}, defaultDj, thisSet);

               thisSet.tracks = thisSet.tracks.map(track => {
                  let thisTrack = Object.assign({}, defaultTrack, track);

                  if (artistLinkHash.hasOwnProperty(slugify(thisTrack.artist))) {
                     thisTrack.artist_links = artistLinkHash[slugify(thisTrack.artist)].fields;
                  }

                  return thisTrack;
               });
            }
            else if (thisSet.hasOwnProperty('type') && thisSet.type === 'performance') {
               thisSet = Object.assign({}, defaultPerformer, thisSet);

               if (artistLinkHash.hasOwnProperty(slugify(thisSet.performer))) {
                  thisSet.performer_links = artistLinkHash[slugify(thisSet.performer)].fields;
               }
            }

            return thisSet;
         });

         playlist.sets = sets;

         const node = playlistType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: playlist
         });

         playlistHash[slugify(data.meta.title)] =  node;
      });

      fs.readdirSync('_posts/podcasts').forEach(file => {
         let data = MT(fs.readFileSync('_posts/podcasts/' + file));

         let podcast = Object.assign({}, defaultPodcast, data.meta);

         if (podcast.description) {
            podcast.description = md.render(podcast.description).replace(/(\r\n|\n|\r)/gm, "");
            podcast.description = podcast.description.split('<a').join('<a target="_blank" ');
         }

         if (podcast.playlist && playlistHash.hasOwnProperty(slugify(podcast.playlist))) {
            podcast.playlist = playlistHash[slugify(podcast.playlist)].fields;
         }
         else {
            podcast.playlist = null;
         }

         if (podcast.image) {
            const imgParts = podcast.image.split('/');
            const imgFileParts = imgParts[imgParts.length - 1].split('.');
            const imgFile = imgFileParts[0] + '.webp';

            if (fs.existsSync(`static/img/webp/${ imgFile }`)) {
              podcast.webp = '/img/webp/' + imgFile;
            }
         }

         const node = podcastType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: podcast
         });

         podcastHash[slugify(data.meta.title)] =  node;
      });

      fs.readdirSync('_posts/events').forEach(file => {
         let data = MT(fs.readFileSync('_posts/events/' + file));

         let ev = Object.assign({}, defaultEvent, data.meta);

         if (ev.description) {
            ev.description = md.render(ev.description).replace(/(\r\n|\n|\r)/gm, "");
            ev.description = ev.description.split('<a').join('<a target="_blank" ');
         }

         if (ev.playlist && playlistHash.hasOwnProperty(slugify(ev.playlist))) {
            ev.playlist = playlistHash[slugify(ev.playlist)].fields;
         }
         else {
            ev.playlist = null;
         }

         if (ev.location && locationHash.hasOwnProperty(slugify(ev.location))) {
            ev.location = locationHash[slugify(ev.location)].fields;
         }
         else {
            ev.location = null;
         }

         const now = moment();

         if (ev.end_datetime) {
            const endMoment = moment(ev.end_datetime, 'YYYY-MM-DD HH:mm:ss');
            ev.expired = moment().isAfter(endMoment);
         }
         else if (ev.start_datetime) {
            const startMoment = moment(ev.start_datetime, 'YYYY-MM-DD HH:mm:ss').add(8, 'hours');
            ev.expired = moment().isAfter(startMoment);
         }
         else if (ev.date) {
            const dateMoment = moment(ev.date, 'YYYY-MM-DD').add(1, 'day');
            ev.expired = moment().isAfter(dateMoment);
         }

         if (ev.image) {
            const imgParts = ev.image.split('/');
            const imgFileParts = imgParts[imgParts.length - 1].split('.');
            const imgFile = imgFileParts[0] + '.webp';

            if (fs.existsSync(`static/img/webp/${ imgFile }`)) {
              ev.webp = '/img/webp/' + imgFile;
            }
         }

         const node = eventType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: ev
         });

         eventHash[slugify(data.meta.title)] =  node;
      });
   });
};
