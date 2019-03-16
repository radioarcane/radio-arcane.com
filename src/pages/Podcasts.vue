<template>
   <Layout>
      <Container class="text-center">
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Podcasts</Title>

          <div v-for="{ node } in $page.allPodcast.edges" :key="node.id">
             <MixcloudPlayer
               v-if="node.mixcloudLink"
               :url="node.mixcloudLink"
            />

            <g-link class="nav-menu__link" :to="`/podcasts/${ node.path }`">
               Link
            </g-link>
          </div>
      </Container>
   </Layout>
</template>

<page-query>
   query Podcast {
      allPodcast (sortBy: "date", order: DESC) {
         edges {
            node {
               id,
               path,
               slug,
               title,
               date,
               description,
               shortDescription,
               mixcloudLink,
               soundcloudLink,
               playlist {
                  sets {
                     tracks {
                        artist,
                        song,
                        artistLinks {
                           appleMusic,
                           bandcamp,
                           facebook,
                           googleMusic,
                           instagram,
                           soundcloud,
                           spotify,
                           twitter,
                           website,
                           youtube
                        }
                     }
                  }
               }
            }
         }
      }
   }
</page-query>

<script>
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Podcasts',
         meta: [
            { description: 'Add Meta Description...' }
         ]
      },
      components: {
         Breadcrumb,
         Container,
         MixcloudPlayer,
         Title
      },
      data () {
         return {
            crumbs: [{
               name: 'Podcasts',
               to: '/podcasts'
            }]
         }
      }
   }
</script>

<style>
</style>
