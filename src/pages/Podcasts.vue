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

   /*
   <Podcast
      v-for="{ node } in $page.allPodcast.edges"
      :key="node.id"
      :podcast="node"
   />
   */

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

<style lang="scss">
   .podcast-card {
      display: flex;
      flex-wrap: wrap;

      &__title {

      }

      &__img {
         width: 100%;
         text-align: center;
         margin: 0 0 1.5rem;

         @include breakpoint($screen-l-min) {
            width: 300px;
            margin-right: $gutter-width;
         }
      }

      &__content {
         flex: 1 0 auto;
      }

      &__player {

      }

      &__blurb {
         @include fluid-type($screen-s-min, $screen-xxl-min, 18px, 20px);
      }
   }
</style>
