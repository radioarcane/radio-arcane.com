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
   import meta from '~/util/meta.js';
   import { breadcrumb } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Podcast from '~/components/Podcast.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/podcasts',
            name: 'Podcasts'
         }]);

         const podcastsWithImages = this.$page.allPodcast.edges.filter(podcast => {
            return podcast.node.image.length > 0;
         });

         const metaImage = podcastsWithImages.length ? podcastsWithImages[0].node.image : null;

         return meta({
            title: 'Podcasts',
            description: 'Checkout Radio Arcane\'s dark music podcasts featuring music & discussion from our dark music specialists & guests.',
            path: '/podcasts',
            image: metaImage,
            jsonLdSchema: breadcrumbSchema
         });
      },
      components: {
         Breadcrumb,
         Container,
         Title,
         Podcast,
      },
      data () {
         const breadcrumbSchema = breadcrumb([{
            path: '/podcasts',
            name: 'Podcasts'
         }]);

         return {
            crumbs: [{
               name: 'Podcasts',
               to: '/podcasts'
            }]
         }
      }
   }
</script>
