<template>
   <Layout>
      <Container>
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Podcasts</Title>

         <Podcast
            v-for="{ node } in $page.allPodcast.edges"
            :key="node.id"
            :podcast="node"
         />
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
               image,
               webp,
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
   import Podcast from '~/components/Podcast.vue';
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
         Title,
         Podcast,
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
