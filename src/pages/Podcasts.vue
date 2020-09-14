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

         <iframe title="Radio Arcane" id="multi_iframe" src="https://www.podbean.com/media/player/multi?playlist=http%3A%2F%2Fplaylist.podbean.com%2F6834639%2Fplaylist_multi.xml&vjs=1&kdsowie31j4k1jlf913=6e7e81c2e0f441e6e660449280cf7f0b422273b4&size=430&skin=6&episode_list_bg=%23ffffff&bg_left=%23000000&bg_mid=%23070808&bg_right=%23323b31&podcast_title_color=%2377d9a3&episode_title_color=%23ffffff&auto=0&share=0&fonts=Helvetica&download=0&rtl=0&show_playlist_recent_number=10&pbad=1" frameborder="0" scrolling="no" height="432" allowfullscreen></iframe>
         <br />
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
               podbeanLink,
               spotifyLink,
               youtubeLink
            }
         }
      }
   }
</page-query>

<script>
   import meta from '~/util/meta.js';
   import { breadcrumb, podcastEpisodes } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Podcast from '~/components/Podcast.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo() {
         const podcastItems = this.$page.allPodcast.edges.map(podcast => podcast.node)

         const breadcrumbSchema = breadcrumb([{
            path: '/podcasts',
            name: 'Podcasts'
         }]);

         const podcastSchema = podcastEpisodes(podcastItems);

         const podcastsWithImages = podcastItems.filter(podcast => {
            return podcast.image.length > 0;
         });

         const metaImage = podcastsWithImages.length ? podcastsWithImages[0].image : null;

         return meta({
            title: 'Podcasts',
            description: 'Checkout Radio Arcane\'s dark music podcasts featuring music & discussion from our dark music specialists & guests.',
            path: '/podcasts',
            image: metaImage,
            jsonLdSchema: [breadcrumbSchema].concat(podcastSchema)
         });
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
