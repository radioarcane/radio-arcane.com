// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

/*
const _ = require('lodash');
*/

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
   appleMusic: null,
   bandcamp: null,
   discogs: null,
   facebook: null,
   googleMusic: null,
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
   address2: null,
   city: null,
   state: null,
   zipcode: null,
   venueLink: null,
   googleMapLink: null,
};

const defaultEvent = {
   layout: 'event',
   title: null,
   displayName: null,
   eventType: null,
   cancelled: false,
   date: null,
   startDatetime: null,
   endDatetime: null,
   image: null,
   webpImage: null,
   description: null,
   shortDescription: null,
   location: null,
   facebookEventLink: null,
   ticketsLink: null,
   cover: null,
   playlist: null,
   expired: true
};

const defaultPodcast = {
   layout: 'podcast',
   title: null,
   displayName: null,
   image: null,
   webpImage: null,
   date: null,
   description: null,
   shortDescription: null,
   mixcloudLink: null,
   soundcloudLink: null,
   podbeanLink: null,
   spotifyLink: null,
   playlist: null,
};

const defaultPlaylist = {
   layout: 'playlist',
   title: null,
   displayName: null,
   playlistType: null,
   date: null,
   sets: [],
   mixcloudLinks: [],
};

const defaultTrack = {
   artist: null,
   song: null,
   request: null,
   artistLinks: null,
};

const defaultDj = {
   djName: null,
   guestDj: null,
   tracks: [],
};

const defaultPerformer = {
   performer: null,
   performerLinks: null,
};

module.exports = function (api) {
   api.loadSource(actions => {
   // Use the Data store API here: https://gridsome.org/docs/data-store-api

      const locationHash = {},
            artistLinkHash = {},
            eventHash = {},
            podcastHash = {},
            playlistHash = {};

      const podcastType = actions.addCollection('Podcast');

      const eventType = actions.addCollection('Event');

      const playlistType = actions.addCollection('Playlist');

      const artistLinkType = actions.addCollection('ArtistLink');

      const locationType = actions.addCollection('Location');

      fs.readdirSync('_posts/artist-links').forEach(file => {
         const data = MT(fs.readFileSync('_posts/artist-links/' + file));

         /*
         const node = artistLinkType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: Object.assign({}, defaultArtistLink, data.meta)
         });
         */

         const artistLinkObj = Object.assign({},
            data.meta, {
               title: data.meta.title,
               slug: file.toLowerCase().replace('.md', '')
            }
         );

         const node = artistLinkType.addNode(artistLinkObj);

         artistLinkHash[slugify(data.meta.title)] =  node;
      });

      fs.readdirSync('_posts/locations').forEach(file => {
         let data = MT(fs.readFileSync('_posts/locations/' + file));

         const locData = Object.assign({}, defaultLocation, data.meta, {
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
         });

         const node = locationType.addNode(locData);

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

                  if (thisTrack.song) {
                     thisTrack.song = thisTrack.song.toString();
                  }

                  if (artistLinkHash.hasOwnProperty(slugify(thisTrack.artist))) {
                     thisTrack.artistLinks = artistLinkHash[slugify(thisTrack.artist)];
                  }

                  return thisTrack;
               });
            }
            else if (thisSet.hasOwnProperty('type') && thisSet.type === 'performance') {
               thisSet = Object.assign({}, defaultPerformer, thisSet);

               if (artistLinkHash.hasOwnProperty(slugify(thisSet.performer))) {
                  thisSet.performerLinks = artistLinkHash[slugify(thisSet.performer)];
               }
            }

            return thisSet;
         });

         playlist.sets = sets;

         /*
         const node = playlistType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: playlist
         });
         */

         const playlistData = Object.assign({}, playlist, {
            slug: file.toLowerCase().replace('.md', '')
         });

         const node = playlistType.addNode(playlistData);

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
            podcast.playlist = playlistHash[slugify(podcast.playlist)];
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

         const podcastObj = Object.assign({}, podcast, {
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
         });

         const node = podcastType.addNode(podcastObj);

         /*
         const node = podcastType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: podcast
         });
         */

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
            ev.playlist = playlistHash[slugify(ev.playlist)];
         }
         else {
            ev.playlist = null;
         }

         if (ev.location && locationHash.hasOwnProperty(slugify(ev.location))) {
            ev.location = locationHash[slugify(ev.location)];
         }
         else {
            ev.location = null;
         }

         const now = moment();

         if (ev.endDatetime) {
            const endMoment = moment(ev.endDatetime, 'YYYY-MM-DD HH:mm:ss');
            ev.expired = moment().isAfter(endMoment);
         }
         else if (ev.startDatetime) {
            const startMoment = moment(ev.startDatetime, 'YYYY-MM-DD HH:mm:ss').add(8, 'hours');
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

         const evntDataObj = Object.assign({}, ev, {
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', '')
         });

         /*
         const node = eventType.addNode({
            title: data.meta.title,
            slug: file.toLowerCase().replace('.md', ''),
            fields: ev,
         });
         */

         const node = eventType.addNode(evntDataObj);

         eventHash[slugify(data.meta.title)] =  node;
      });
   });
};
