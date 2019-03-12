<template>
   <div class="event-playlist" :data-filter-value="playlist.type" itemscope itemtype="http://schema.org/MusicPlaylist">
      <header class="event-playlist__header">
         <h2 class="event-playlist__title" itemprop="name">{{ playlist.title }}</h2>
         <time :datetime="playlist.date" class="event-playlist__date">{{ playlist.date }}</time>
      </header>

      <div v-for="(node, index) in playlist.sets" :key="index">
        <h3 v-if="node.djName">{{ node.djName }}</h3>
        <h3 v-else-if="node.guestDj">{{ node.guestDj }}</h3>
        <h3 v-else-if="node.performer">Performance by: {{ node.performer }}</h3>

        <ul v-if="node.tracks && node.tracks.length" class="playlist">
           <li v-for="(track, j) in node.tracks" class="playlist__track" :key="j">
             <div class="track" itemprop="track" itemscope="" itemtype="http://schema.org/MusicRecording">
                <span class="track__artist" itemprop="byArtist">{{ track.artist }}</span> - <span class="track__song" itemprop="name">{{ track.song }}</span>
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
   export default {
      name: 'Playlist',
      props: {
         playlist: {
            default: {},
            type: Object
         }
      },
      methods: {
      },
      mounted () {
         console.log('MOUNTED...')
         console.log(this.$props);
      }
   }
</script>

<style lang="scss">
</style>
