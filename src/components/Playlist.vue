<template>
   <div class="event-playlist"
        :data-filter-value="playlist.type"
        itemscope
        itemtype="http://schema.org/MusicPlaylist"
   >
      <header class="event-playlist__header">
         <h2 class="event-playlist__title" itemprop="name">{{ playlist.displayName }}</h2>

         <time :datetime="playlist.date" class="event-playlist__date">
            {{ playlist.date | moment("dddd, MMMM D, YYYY") }}
         </time>
      </header>

      <div>
         <div v-if="hasArtistRequest">
            * = Request for Artist
         </div>
         <div v-if="hasSongRequest">
            ** = Request for Song
         </div>
      </div>

      <div v-for="(node, index) in playlist.sets" :key="index">
        <h3 v-if="node.djName">{{ node.djName }}</h3>
        <h3 v-else-if="node.guestDj">{{ node.guestDj }}</h3>
        <h3 v-else-if="node.performer">Performance by: {{ node.performer }}</h3>

        <ul v-if="node.tracks && node.tracks.length" class="playlist">
           <li v-for="(track, j) in node.tracks" class="playlist__track" :key="j">
             <div class="track" itemprop="track" itemscope="" itemtype="http://schema.org/MusicRecording">
                <span class="track__artist" itemprop="byArtist">{{ track.artist }}</span> - <span class="track__song" itemprop="name">{{ track.song }}</span>

                <span class="track__request" v-if="track.request && track.request === 'artist'">*</span>
                <span class="track__request" v-else-if="track.request && track.request === 'song'">**</span>

                <a v-if="getArtistLinks(track)"
                   @click.prevent="showArtistLinksModal(track.artist, track.artistLinks)"
                   :title="`Stream or follow ${ track.artist }`"
                >
                   <InfoIcon class="icon icon-info" />
                </a>
             </div>
           </li>
        </ul>

        <p v-if="(node.djName || node.guestDj) && node.tracks && node.tracks.length === 0">
           ????
        </p>
      </div>
   </div>
</template>

<script>
   import ArtistLinksModal from '~/components/ArtistLinksModal';
   import InfoIcon from '~/assets/svg/info-circled.svg';

   export default {
      name: 'Playlist',
      props: {
         playlist: {
            type: Object
         }
      },
      computed: {
         hasArtistRequest () {
            let hasRequest = false;
            const len = this.playlist.sets.length;

            for (let i = 0; i < len; i++) {
               let requestArtist = false;
               if (this.playlist.sets[i].hasOwnProperty('tracks')) {
                   requestArtist = this.playlist.sets[i].tracks.some(trk => {
                     return trk.hasOwnProperty('request') && trk.request === 'artist';
                  });
               }

               if (requestArtist) {
                  hasRequest = true;
                  break;
               }
            }

            return hasRequest;
         },
         hasSongRequest () {
            let hasRequest = false;
            const len = this.playlist.sets.length;

            for (let i = 0; i < len; i++) {
               let requestSong = false;
               if (this.playlist.sets[i].hasOwnProperty('tracks')) {
                   requestSong = this.playlist.sets[i].tracks.some(trk => {
                     return trk.hasOwnProperty('request') && trk.request === 'song';
                  });
               }

               if (requestSong) {
                  hasRequest = true;
                  break;
               }
            }

            return hasRequest;
         }
      },
      components: {
         ArtistLinksModal,
         InfoIcon,
      },
      methods: {
         getArtistLinks (track) {
            if (!track.artistLinks) {
               return null;
            }

            let links = Object.assign({}, track.artistLinks);

            Object.keys(links).forEach(key => {
               if (!links[key]) {
                  delete links[key];
               }
            });

            return Object.keys(links).length ? links : null;
         },
         showArtistLinksModal (artist, links = {}) {
            this.$modal.show(ArtistLinksModal, {
              artist,
              links
            }, {
              draggable: true
           });
         },

         hideArtistLinksModal () {
               this.$modal.hide('artist-links');
         }

      }
   }
</script>

<style lang="scss">
   .event-playlist {
      border: 20px solid #fff;
      border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='%23FFFFFF'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E") 25;
      border-radius: .3em;
      animation: lightbleed-box .12s both infinite;
      padding: $padding-vertical $padding-horizontal;
      margin: 0 0 ($padding-vertical * 4);

      &__header {
         border-bottom: 1px solid hex-to-rgba($white, 0.7);
         margin: 0 0 ($padding-vertical * 2);
         padding: 0 0 0.5em;
      }

      &__title {
         margin: 0 0 ($padding-vertical / 2);
      }

      &__date {

      }

      $light: rgba(250,250,250,.9);
      $dark: rgba(0,0,0,.8);

      @keyframes lightbleed-box {
      	0%	{ box-shadow:  0 0 6px rgba(255,255,255,.8); }
      	25% { box-shadow: 0 0 9px $light; }
      	50%{ box-shadow: 0 0 9px rgba(255,255,255,.75); }
      	75% { box-shadow: 0 0 10px $light; }
      	100%{ box-shadow: 0 0 5px rgba(250,250,250,.8); }
      }
   }

.playlist {
   list-style: none;
   padding: 0;
   margin: 0 0 ($padding-vertical * 2);

   &__track {
      position: relative;
   }

   .track {
      display: inline-block;
   }
}
</style>
