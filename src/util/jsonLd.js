import config from '~/config.js';

export const breadcrumb = items => {
   const crumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{
         '@type': 'ListItem',
         position: 1,
         item: {
            '@id': config.siteUrl,
            name: 'Home'
         }
      }]
   };

   items.forEach((item, index) => {
      crumbs.itemListElement.push({
         '@type': 'ListItem',
         position: index + 2,
         item: {
            '@id': config.siteUrl + item.path,
            name: item.name
         }
      });
   });

   return crumbs;
};

export const locationPlace = location => {
   const place = {
      '@type': 'Place',
   };

   if (location.title) {
      place.name = location.title;
   }

   if (location.address) {
      place.address = {
         '@type': 'PostalAddress',
         addressCountry: 'US',
         streetAddress: location.address
      };

      if (location.city) {
         place.address.addressLocality = location.city;
      }

      if (location.state) {
         place.address.addressRegion = location.state;
      }

      if (location.zipcode) {
         place.address.postalCode = location.zipcode;
      }
   }

   if (location.venueLink) {
      place.sameAs = location.venueLink;
   }

   if (location.googleMapLink) {
      place.hasMap = location.googleMapLink;
   }

   return place;
};

export const musicEvent = event => {
   const eventSchema = {
      '@context': 'https://schema.org',
      '@type' : 'MusicEvent',
      name: event.displayName,
      url: `${ config.siteUrl }${ event.path }`,
      description: (() => {
         if (event.shortDescription) {
            return event.shortDescription;
         }

         return 'Dark Eclectic Music all night featuring our rotating cast of Dark Music Specialists.';
      })()
   };

   if (event.startDatetime) {
      eventSchema.startDate = event.startDatetime.replace(' ', 'T');
   }

   if (event.endDatetime) {
      eventSchema.endDate = event.endDatetime.replace(' ', 'T');
   }

   if (event.image) {
      eventSchema.image = `${ config.siteUrl }${ event.image }`;
   }

   if (event.facebookEventLink) {
      eventSchema.sameAs = event.facebookEventLink;
   }

   if (event.location) {
      eventSchema.location = locationPlace(event.location);
   }

   if (event.cover || event.ticketsLink) {
      eventSchema.offers = {
         '@type': 'Offer',
         "url": event.ticketsLink,
      };

      if (event.cover) {
         eventSchema.offers.priceCurrency = 'USD';
         eventSchema.offers.price = event.cover;
      }

      if (event.ticketsLink) {
         eventSchema.offers.url = event.ticketsLink;
      }
   }

   return eventSchema;
};

export const radioSeries = () => {
   const podcastSchema = {
      '@context': 'https://schema.org',
      '@type' : "RadioSeries",
      name: config.siteName,
      url: config.mixcloud,
      sameAs: config.soundcloud,
      description: 'Radio Arcane is a collective of Dark Music Specialists in Louisville, KY that host events, live music and dark arts entertainment.',
      image: `${ config.siteUrl }${ config.defaultMetaImg }`,
      encodingFormat: 'audio/mpeg',
      isAccessibleForFree: true,
      productionCompany: {
   		'@type': 'Organization',
   		logo: `${ config.siteUrl }${ config.defaultMetaImg }`,
   		name: config.siteName,
   		url: config.siteUrl,
   		sameAs: config.facebook,
   	},
      genre: 'Gothic',
      inLanguage: {
			'@type': 'Language',
			name: 'English',
			alternateName: 'en'
		},
      keywords: 'Gothic, Goth, Darkwave, Post-Punk, Coldwave, Minimal Synth, New Wave, Industrial, EBM, Synthpop, Synthwave, Radio Arcane, Art Sanctuary, Louisville, Kentucky, Dark Music'
   };

   return podcastSchema;
};

export const episode = podcast => {
   const titleParts = podcast.title.split(' ');

   const episodeNumber = (() => {
      if (titleParts.length) {
         const num = parseInt(titleParts[0]);

         if (!isNaN(num)) {
            return num;
         }
      }

      return 0;
   })();

   const description = (() => {
      if (podcast.shortDescription) {
         return podcast.shortDescription;
      }

      if (podcast.description) {
         return podcast.toString().description
               .replace(/<[^>]+>/g, ' ')
               .replace(/\s{2,}/g, ' ')
               .trim();
      }

      return '';
   })();

   const playerEmbed = (() => {
      if (podcast.mixcloudLink) {
         const urlParts = podcast.mixcloudLink
                          .split('/')
                          .filter(str => str !== '')
                          .reverse();

         if (urlParts.length < 4) {
            return podcast.mixcloudLink;
         }

         return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2F${ urlParts[1] }%2F${ urlParts[0] }%2F`;
      }

      return 0;
   })();

   let episodeSchema = {
      '@context': 'https://schema.org',
      '@type': 'RadioEpisode',
      name: podcast.title,
      description: description,
      datePublished: podcast.date,
      image: (() => {
         if (podcast.image) {
            return `${ config.siteUrl }${ podcast.image }`;
         }

         return `${ config.siteUrl }${ config.defaultMetaImg }`;
      })(),
      inLanguage: {
			'@type': 'Language',
			name: 'English',
			alternateName: 'en'
		},
      genre: 'Gothic',
      isAccessibleForFree: true,
      sameAs: []
   };

   if (episodeNumber) {
      episodeSchema.episodeNumber = episodeNumber;
      episodeSchema.position = episodeNumber;
   }

   if (podcast.mixcloudLink) {
      episodeSchema.url = podcast.mixcloudLink;
      episodeSchema.discussionUrl = podcast.mixcloudLink;

      if (podcast.soundcloudLink) {
         episodeSchema.sameAs.push(podcast.soundcloudLink);
      }

      if (podcast.podbeanLink) {
         episodeSchema.sameAs.push(podcast.podbeanLink);
      }

      if (podcast.spotifyLink) {
         episodeSchema.sameAs.push(podcast.spotifyLink);
      }

      episodeSchema.audio = {
         '@type': 'AudioObject',
         encodingFormat: 'audio/mpeg',
         embedUrl: playerEmbed
      };
   }
   else if (podcast.soundcloudLink) {
      episodeSchema.url = podcast.soundcloudLink;
      episodeSchema.discussionUrl = podcast.soundcloudLink;
   }

   return episodeSchema;
};

export const podcastEpisode = podcast => {
   let radioSchema = radioSeries();
   radioSchema.episode = episode(podcast);
   return radioSchema;
};

export const podcastEpisodes = podcasts => {
   let radioSchema = radioSeries();
   radioSchema.episode = podcasts.map(podcast => episode(podcast));
   return radioSchema;
};

export const musicPlaylist = playlist => {
   let tracks = [];
   let numTracks = 0;

   playlist.sets.forEach(musicSet => {
      if (musicSet.tracks && musicSet.tracks.length) {
         numTracks += musicSet.tracks.length;

         musicSet.tracks.forEach(track => {
            tracks.push({
               '@type': 'MusicRecording',
               byArtist: track.artist,
               name: track.song
            });
         });
      }
   });

   let playlistSchema = {
      '@context': 'http://schema.org',
      '@type': 'MusicPlaylist',
      name: playlist.displayName,
      numTracks: numTracks,
      track: tracks,
      dateCreated: playlist.date,
      genre: 'Gothic',
      producer: {
   		'@type': 'Organization',
   		logo: `${ config.siteUrl }${ config.defaultMetaImg }`,
   		name: config.siteName,
   		url: config.siteUrl,
   		sameAs: config.facebook,
   	},
      keywords: 'Gothic, Goth, Darkwave, Post-Punk, Coldwave, Minimal Synth, New Wave, Industrial, EBM, Synthpop, Synthwave, Radio Arcane, Art Sanctuary, Louisville, Kentucky, Dark Music, DJ, Playlist'
   };

   return playlistSchema;
};

export default {
   breadcrumb,
   episode,
   locationPlace,
   musicEvent,
   musicPlaylist,
   podcastEpisode,
   podcastEpisodes
};
