<template>
   <Layout>
      <Container>
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Playlists</Title>

         <Tabs>
            <Tab :active="filter === null"
                 :onClick="tabClick.bind(null, null)"
            >
               All
            </Tab>
            <Tab :active="filter === 'radio-arcane'"
                 :onClick="tabClick.bind(null, 'radio-arcane')"
            >
               Radio Arcane
            </Tab>
            <Tab
               :active="filter === 'podcast'"
               :onClick="tabClick.bind(null, 'podcast')"
            >
               Podcasts
            </Tab>
            <Tab
               :active="filter === 'arcane-alive'"
               :onClick="tabClick.bind(null, 'arcane-alive')"
            >
               Arcane Alive
            </Tab>
         </Tabs>

         <section v-for="{ node } in filterEventType($page.allPlaylist.edges)" :key="node.id">
            <Playlist :playlist="node" />
          </section>
      </Container>
   </Layout>
</template>

<page-query>
   query Playlist {
      allPlaylist (sortBy: "date", order: DESC, perPage: 100) {
         edges {
            node {
               id,
               slug,
               title,
               displayName,
               date,
               playlistType,
               sets {
                  djName,
                  guestDj,
                  performer,
                  performerLinks {
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
                  },
                  tracks {
                     artist,
                     song,
                     request,
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
</page-query>

<script>
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Playlist from '~/components/Playlist.vue';
   import Tab from '~/components/Tab.vue';
   import Tabs from '~/components/Tabs.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Playlists | Radio Arcane',
         meta: [
            { description: 'Add Meta Description...' }
         ]
      },
      components: {
         Breadcrumb,
         Container,
         Playlist,
         Tab,
         Tabs,
         Title
      },
      data () {
         return {
            crumbs: [{
               name: 'Playlists',
               to: '/playlists'
            }],
            filter: null,
         }
      },
      methods: {
         tabClick (filterValue = null) {
            this.filter =  filterValue;
         },
         filterEventType (playlists = []) {
            const { filter } = this;

            if (filter === null) {
               return playlists;
            }

            return playlists.filter(item => item.node.playlistType === filter);
         }
      }
   }
</script>

<style>
</style>
