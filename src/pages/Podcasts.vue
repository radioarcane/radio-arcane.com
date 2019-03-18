<template>
   <Layout>
      <Container>
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Podcasts</Title>

         <Podcast
            v-for="{ node } in $page.allPodcast.edges"
            :podcast="node"
            :key="node.id"
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
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import Title from '~/components/Title.vue';

   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';

   import Podcast from '~/components/Podcast.vue';

   export default {
      metaInfo: {
         title: 'Podcasts | Radio Arcane',
         meta: [
            { description: 'Add Meta Description...' }
         ]
      },
      components: {
         Breadcrumb,
         Container,
         MixcloudPlayer,
         Title,
         GridItem,
         GridContainer,
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
/*
$screen-xs-min: 0;
$screen-s-min: 480px;
$screen-m-min: 768px;
$screen-l-min: 992px;
$screen-xl-min: 1200px;
$screen-xxl-min: 1400px;
*/

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
