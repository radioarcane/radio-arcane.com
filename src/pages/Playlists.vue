<template>
   <Layout>
      <Container class="text-center">
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Playlists</Title>

          <section v-for="{ node } in $page.allPlaylist.edges" :key="node.id">
             <Playlist v-bind:playlist="node" />
          </section>
      </Container>
   </Layout>
</template>

<page-query>
query Playlist {
   allPlaylist (sortBy: "date", order: DESC) {
      edges {
         node {
            id,
            slug,
            title,
            date,
            type,
            sets {
             type,
             djName,
             guestDj,
             performer,
             tracks {
               artist,
               song,
               requestSong,
               requestArtist
             }
           },

      }
   }
}
}
</page-query>

<script>
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Playlist from '~/components/Playlist.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Playlists',
         description: 'Add Meta Description...',
      },
      components: {
         Breadcrumb,
         Container,
         Playlist,
         Title
      },
      data () {
         return {
            crumbs: [{
               name: 'Playlists',
               to: '/playlists'
            }]
         }
      }
   }
</script>

<style>
</style>
