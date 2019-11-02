<template>
   <Layout>
      <Container>
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Artists Played</Title>

         <ul class="all-artists-list">
            <li v-for="node in getSorted($page.allArtistLink.edges)"
                :key="node.id"
                 class="all-artists-list__item"
            >
               {{ node.title }}
            </li>
         </ul>
      </Container>
   </Layout>
</template>

<page-query>
   query Artists {
      allArtistLink (sortBy: "title", order: ASC) {
         edges {
            node {
               id,
               title,
               appleMusic,
               bandcamp,
               discogs,
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
</page-query>

<script>
   import meta from '~/util/meta.js';
   import { breadcrumb } from '~/util/jsonLd';

   import ArtistLinksModal from '~/components/ArtistLinksModal.vue';
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/playlists',
            name: 'Playlists'
         }, {
            path: '/playlists/artists',
            name: 'Artists'
         }]);

         return meta({
            title: 'Artists',
            description: 'Artists Played at Radio Arcane Events and on the Podcast.',
            path: '/playlists/artists'
         });
      },
      components: {
         ArtistLinksModal,
         Breadcrumb,
         Container,
         Title
      },
      data () {
         return {
            crumbs: [{
               name: 'Playlists',
               to: '/playlists'
            }, {
               name: 'Artists',
               to: '/playlists/artists'
            }],
         };
      },
      methods: {
         getSorted (artists = []) {
            const modified = artists.map(item => {
               const artist = item.node;

               let artistName = artist.title.toString();
               let artistNameLc = artistName.toLowerCase();

               if (artistNameLc.slice(0, 4) === 'the ' && artistNameLc !== 'the the') {
                  artistName = artistName.slice(4) + ', The';
                  artistNameLc = artistName.toLowerCase();
               }

               if (artistNameLc === "'til tuesday") {
                  artistNameLc = 'til tuesday';
               }

               if (artistNameLc === ":wumpscut:") {
                  artistNameLc = 'wumpscut';
               }

               if (artistNameLc === "//tense//") {
                  artistNameLc = 'tense';
               }

               return Object.assign({}, artist, {
                  title: artistName,
                  titleKey: artistNameLc,
               });
            });

            return modified.sort((a, b) => (a.titleKey > b.titleKey) ? 1 : -1);
         },
      }
   }
</script>

<style lang="scss">
   .all-artists-list {
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      justify-content: center;
      align-items: stretch;

      &__item {
         padding: 0.25em 1em;
      }
   }


</style>
