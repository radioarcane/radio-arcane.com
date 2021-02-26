<template>
   <Layout>
      <Container>
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Playlists</Title>

         <p>
            Below are DJ setlists for podcasts and some past live events.
         </p>

         <Tabs>
            <Tab v-for="(tab, index) in tabs"
                  :key="index"
                  :active="filter === tab.filter"
                  :onClick="tabClick.bind(null, tab.filter)"
            >
               {{ tab.name }} <span class="badge">{{ getTotal($page.allPlaylist.edges, tab.filter) }}</span>
            </Tab>
         </Tabs>

         <section v-for="{ node } in filterEventType($page.allPlaylist.edges)" :key="node.id">
            <Playlist :playlist="node" />
          </section>

          <ClientOnly>
             <InfiniteLoading @infinite="infiniteHandler" :identifier="infiniteId">
                 <div slot="no-more"></div>
             </InfiniteLoading>
          </ClientOnly>
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
               mixcloudLinks {
                  url
               },
               sets {
                  djName,
                  guestDj,
                  performer,
                  performerLinks {
                     appleMusic,
                     bandcamp,
                     facebook,
                     discogs,
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
                        discogs,
                        facebook,
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
   import meta from '~/util/meta.js';
   import { breadcrumb, musicPlaylist } from '~/util/jsonLd';

   import InfiniteLoading from 'vue-infinite-loading';
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Playlist from '~/components/Playlist.vue';
   import Tab from '~/components/Tab.vue';
   import Tabs from '~/components/Tabs.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/playlists',
            name: 'Playlists'
         }]);

         const playlistSchema = this.$page.allPlaylist.edges.map(playlist => musicPlaylist(playlist.node));

         return meta({
            title: 'Playlists',
            description: 'Checkout Playlists from past Radio Arcane music events and podcasts.',
            path: '/playlists',
            jsonLdSchema: [breadcrumbSchema].concat(playlistSchema)
         });
      },
      components: {
         Breadcrumb,
         Container,
         InfiniteLoading,
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
            tabs: [{
               name: 'All',
               filter: null,
            }, {
               name: 'Radio Arcane',
               filter: 'radio-arcane'
            }, {
               name: 'Podcasts',
               filter: 'podcast'
            }, {
               name: 'Arcane Alive!',
               filter: 'arcane-alive'
            }, {
               name: 'Warped Wednesday',
               filter: 'warped-wednesday'
            }],
            filter: null,
            playlistsLoaded: 2,
            playlistLoadCount: 2,
            infiniteId: +new Date(),
         };
      },
      methods: {
         tabClick (filterValue = null) {
            this.playlistsLoaded = this.playlistLoadCount;
            this.filter = filterValue;
            this.infiniteId += 1;
         },
         getTotal (playlists, filter = null) {
            if (!filter) {
               return playlists.length;
            }

            return playlists.filter(item => item.node.playlistType === filter).length;
         },
         filterEventType (playlists = []) {
            const { filter } = this;

            if (filter === null) {
               return playlists.slice(0, this.playlistsLoaded);
            }

            return playlists
                   .filter(item => item.node.playlistType === filter)
                   .slice(0, this.playlistsLoaded);
         },
         infiniteHandler($state) {
            if (this.playlistsLoaded >= this.$page.allPlaylist.edges.length) {
               $state.complete();
            }
            else {
               this.playlistsLoaded += this.playlistLoadCount;
               $state.loaded();
            }
         },
      }
   }
</script>

<style lang="scss">
   .badge {
      display: inline-block;
      padding: .25em .4em;
      font-size: 75%;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: .25rem;
      color: $white-smoke;
      background: $secondary-color;
      margin-left: 8px;
      position: relative;
      top: -4px;
   }
</style>
