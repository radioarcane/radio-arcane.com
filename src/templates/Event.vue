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
      <script v-html="getSchema()" type="application/ld+json"></script>
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
   import { musicEvent, breadcrumb } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import Playlist from '~/components/Playlist.vue';
   import Title from '~/components/Title.vue';

   export default {
      components: {
         Breadcrumb,
         Event,
         Container,
         Playlist,
         Title
      },
      metaInfo() {
         const metaTitle = this.$page.event.displayName;

         const metaDescription = (() => {
            if (this.$page.event.shortDescription) {
               return this.$page.event.shortDescription;
            }

            return "Dark Eclectic Music all night featuring our rotating cast of Dark Music Specialists."
         })();

         const metaImg = this.$page.event.image ? `https://www.radio-arcane.com${ this.$page.event.image }` : 'https://www.radio-arcane.com/img/logo--radio-arcane.png';

         const canonical = `https://www.radio-arcane.com${ this.$page.event.path }`;

         return {
            title: metaTitle,
            meta: [

               { property: 'og:title', content: metaTitle },
               { property: 'og:site_name', content: 'Radio Arcane' },
               { property: 'og:url', content: canonical },
               { property: 'og:image', content: metaImg },
               { property: 'og:description', content: metaDescription },

               { name: 'twitter:card', content: 'summary' },
               { name: 'twitter:site', content: canonical },
               { name: 'twitter:title', content: metaTitle },
               { name: 'twitter:description', content: metaDescription },
               { name: 'twitter:creator', content: '@Radio_Arcane' },
               { name: 'twitter:image:src', content: metaImg },

               { itemprop: 'name', content: metaTitle },
               { itemprop: 'description', content: metaDescription },
               { itemprop: 'image', content: metaImg },
            ],
            links: [
               { rel: 'canonical', href: canonical }
            ],
         };
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
         },
         getSchema() {
            const eventSchema = musicEvent(this.$page.event);

            const breadcrumbSchema = breadcrumb([{
               path: '/events',
               name: 'Events'
            }, {
               path: this.$page.event.path,
               name: this.$page.event.displayName
            }]);

            return JSON.stringify([
               breadcrumbSchema,
               eventSchema
            ]);
         }
      }
   }
</script>
