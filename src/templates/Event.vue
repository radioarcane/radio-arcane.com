<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="getCrumbs()" />

         <article>
            <Title>{{ $page.event.displayName }}</Title>

            <Event
               :event="$page.event"
               :includeLink="false"
               :showTitle="false"
            />

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
         cancelled,
         image,
         webp,
         pageImage,
         pageImageWebp,
         description,
         shortDescription,
         facebookEventLink,
         ticketsLink,
         youtube,
         cover,
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
                  discogs,
                  facebook,
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
</page-query>

<script>
   import meta from '~/util/meta.js';
   import { breadcrumb, musicEvent, musicPlaylist } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import Playlist from '~/components/Playlist.vue';
   import Title from '~/components/Title.vue';
   import Video from '~/components/Video.vue';

   export default {
      components: {
         Breadcrumb,
         Event,
         Container,
         Playlist,
         Title,
         Video
      },
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/events',
            name: 'Events'
         }, {
            path: this.$page.event.path,
            name: this.$page.event.displayName
         }]);

         const eventSchema = musicEvent(this.$page.event);

         const playlistSchema = this.$page.event.playlist ? musicPlaylist(this.$page.event.playlist) : null;

         const metaTitle = `${ this.$page.event.displayName } (${ this.$page.event.date })`;

         const metaDescription = (() => {
            let desc = '';

            if (this.$page.event.shortDescription) {
               desc = this.$page.event.shortDescription;
            }
            else if (this.$page.event.description) {
               desc = this.$page.event.description
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s{2,}/g, ' ')
                  .trim();

               if (desc.length > 255) {
                  desc = desc.substr(0, 252) + '...';
               }
            }

            return desc;
         })();

         return meta({
            title: metaTitle,
            description: metaDescription,
            image: this.$page.event.image,
            path: this.$page.event.path,
            jsonLdSchema: [
               breadcrumbSchema,
               eventSchema,
               playlistSchema ? playlistSchema : null
            ].filter(item => item !== null)
         });
      },
      methods: {
         getCrumbs() {
            return [{
               to: '/events',
               name: "Events"
            }, {
               name: this.$page.event.displayName,
               to: this.$page.event.path,
            }];
         }
      }
   }
</script>
