<template>
   <Layout>
      <Container class="text-center">
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Playlists</Title>

          <div v-for="{ node } in $page.allPlaylist.edges" :key="node.id">
             {{ node.title }}
          </div>
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
               type,
               sets {
                type,
                djName,
                guestDj,
                performer,
                tracks {
                  artist,
                  song,
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
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Playlists',
         description: 'Add Meta Description...',
      },
      components: {
         Breadcrumb,
         Container,
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
