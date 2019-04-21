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

      <script v-html="schemas" type="application/ld+json"></script>
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
   import { breadcrumb } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Podcast from '~/components/Podcast.vue';
   import Title from '~/components/Title.vue';

   const metaTitle = 'Podcasts | Radio Arcane';
   const metaDescription = 'Darkwave, Post-Punk, Gothic, Synthwave, EBM, Industrial, Synthpop.';
   const metaImg = 'https://www.radio-arcane.com/img/logo--radio-arcane.png';

   export default {
      metaInfo: {
         title: 'Podcasts',
         meta: [
            { description: metaDescription },
            { property: 'og:title', content: metaTitle },
            { property: 'og:site_name', content: 'Radio Arcane' },
            { property: 'og:url', content: 'https://www.radio-arcane.com/podcasts' },
            { property: 'og:image', content: metaImg },
            { property: 'og:description', content: metaDescription },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: 'https://www.radio-arcane.com/podcasts' },
            { name: 'twitter:title', content: metaTitle },
            { name: 'twitter:description', content: metaDescription },
            { name: 'twitter:creator', content: '@Radio_Arcane' },
            { name: 'twitter:image:src', content: metaImg },

            { itemprop: 'name', content: metaTitle },
            { itemprop: 'description', content: metaDescription },
            { itemprop: 'image', content: metaImg },
         ],
         links: [
            { rel: 'canonical', href: 'https://www.radio-arcane.com/podcasts' }
        ]
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
            }],
            schemas: JSON.stringify([
               breadcrumbSchema
            ]),
         }
      }
   }
</script>
