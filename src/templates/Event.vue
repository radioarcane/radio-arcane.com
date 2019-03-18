<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="getCrumbs()" />

         <article>
            <Title>{{ $page.event.displayName }}</Title>

            <Event :event="$page.event" />

            <section v-if="$page.event.playlist">
               <h2>Event Playlist</h2>

               <Playlist
                  :playlist="$page.event.playlist"
                  :showHeader="false"
               />
            </section>
         </article>
      </Container>
   </Layout>
</template>

<page-query>
   query Event ($path: String!) {
      event (path: $path) {
         id,
         path,
         slug,
         title,
         displayName,
         eventType,
         date,
         startDatetime,
         endDatetime,
         image,
         webp,
         description,
         shortDescription,
         facebookEventLink,
         ticketsLink,
         expired,
         location {
            title,
            address,
            address2,
            city,
            state,
            zipcode,
            venueLink,
            googleMapLink,
         }
         playlist {
            date,
            displayName,
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
</page-query>

<script>
   import Layout from '~/layouts/Default.vue'

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import Playlist from '~/components/Playlist.vue';
   import Title from '~/components/Title.vue';

   export default {
      components: {
         Layout,
         Breadcrumb,
         Event,
         Container,
         Playlist,
         Title
      },
      metaInfo () {
         return {
            title: this.$page.event.displayName + ' | Radio Arcane',
            meta: [
               { description: 'Add Meta Description...' }
            ]
         }
      },
      methods: {
         getCrumbs() {
            return [{
               to: '/events',
               name: "Events"
            }, {
               name: this.$page.event.displayName
            }];
         }
      }
   }
</script>

<style lang="scss">
</style>
