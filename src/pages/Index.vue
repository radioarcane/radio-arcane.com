<template>
   <Layout>
      <Container>
         <FlashContainer tag="article">
            <p>Radio Arcane is a collective of Dark Music Specialists in Louisville, KY that host events, live music and dark arts entertainment. A podcast featuring music and discussion is also available on Mixcloud and SoundCloud.</p>

            <p>Dark Eclectic Music &ndash; predominately focused on the use of the synthesizer, including: Gothic, Darkwave, Post-Punk, Industrial, EBM, Coldwave, Synthwave, Synthpop, New Wave, Minimal, and related genres.</p>
         </FlashContainer>

         <Section v-if="$page.nextEvents.edges.length">
            <Heading strike animate uppercase tag="h1">
               <span v-if="$page.nextEvents.edges.length > 1">
                  Next Radio Arcane Events
               </span>
               <span v-else>
                  Next Radio Arcane Event
               </span>
            </Heading>

            <!--
            <GridContainer center="true">
               <GridItem :sizes="{
                  xs: 12, sm: 12, md: 10, lg: 8, xl: 6
               }"
               >
                  <Video id="gICt622ePYc" />
               </GridItem>
            </GridContainer>
         -->


            <!--
            <div class="event-alert text-center">
               <h3>
                  COVID-19 UPDATE
               </h3>

               <P>
                  All upcoming events scheduled into May have been postponed or canceled.
               </P>

               <p>
                  Please stay safe out there, take care of yourselves and each other, and stay tuned for future updates.
               </p>
            </div>
         -->


            <div
               v-for="({node}, index) in $page.nextEvents.edges"
               :key="node.id"
               class="event-divider"
            >
               <Event :event="node" />
            </div>

         </Section>

         <!--
         <Section v-if="$page.convergenceEvent.edges.length">
            <Event :event="$page.convergenceEvent.edges[0].node" />
            <hr /><br />
         </Section>


         <Center>
            <Btn to="/events">
               <span>Checkout Upcoming & Past Events</span>
               <SvgIcon name="right-open" use="right-open" />
            </Btn>
         </Center>
            -->

         <Section v-if="$page.podcasts.edges.length" :padTop="true">
            <Heading strike animate uppercase tag="h3">
               Latest Podcast
            </Heading>

            <Podcast :podcast="$page.podcasts.edges[0].node" />

            <Center>
               <Btn to="/podcasts">
                  <span>Checkout Past Podcasts</span>
                  <SvgIcon name="right-open" use="right-open" />
               </Btn>
            </Center>
         </Section>


         <Section v-if="$page.nextWarpedWedEvent.edges.length" :padTop="true">
            <Heading strike animate uppercase tag="h3">
               Upcoming Related Events
            </Heading>

            <Event :event="$page.nextWarpedWedEvent.edges[0].node" />
         </Section>

      </Container>
   </Layout>
</template>

<page-query>
   query HomeData {
      nextEvents: allEvent (filter: {
            expired: { eq: false },
            eventType: {ne: "warped-wednesday"},
            cancelled: { ne: true}
         },
         sortBy: "date",
         order: ASC,
         perPage: 3
      ) {
         edges {
            node {
               id,
               path,
               slug,
               title,
               displayName,
               eventType,
               cancelled,
               date,
               startDatetime,
               endDatetime,
               image,
               webp,
               description,
               shortDescription,
               facebookEventLink,
               ticketsLink,
               cover,
               expired,
               youtube,
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
            }
         }
      },
      nextEvent: allEvent (filter: {
         expired: { eq: false },
         eventType: {eq: "radio-arcane"},
         cancelled: { ne: true}
      }, sortBy: "date", order: ASC, perPage: 1) {
         edges {
            node {
               id,
               path,
               slug,
               title,
               displayName,
               eventType,
               cancelled,
               date,
               startDatetime,
               endDatetime,
               image,
               webp,
               description,
               shortDescription,
               facebookEventLink,
               ticketsLink,
               cover,
               expired,
               youtube,
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
            }
         }
      },
      nextLiveEvent: allEvent (filter: {
         expired: { eq: false },
         eventType: {eq: "arcane-alive"},
         cancelled: { ne: true}
      }, sortBy: "date", order: ASC, perPage: 1) {
         edges {
            node {
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
               description,
               shortDescription,
               facebookEventLink,
               ticketsLink,
               cover,
               expired,
               youtube,
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
            }
         }
      },
      convergenceEvent: allEvent (filter: {
         expired: { eq: false },
         eventType: {eq: "convergence"},
         cancelled: { ne: true}
      }, sortBy: "date", order: ASC, perPage: 1) {
         edges {
            node {
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
               description,
               shortDescription,
               facebookEventLink,
               ticketsLink,
               cover,
               expired,
               youtube,
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
            }
         }
      },
      nextWarpedWedEvent: allEvent (filter: {
         expired: { eq: false },
         eventType: {eq: "warped-wednesday"},
         cancelled: {ne: true}
      }, sortBy: "date", order: ASC, perPage: 1) {
         edges {
            node {
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
               description,
               shortDescription,
               facebookEventLink,
               ticketsLink,
               cover,
               expired,
               youtube,
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
            }
         }
      },
      podcasts: allPodcast (filter: {mixcloudLink: { ne: ""}}, sortBy: "date", order: DESC, perPage: 1) {
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

   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import FlashContainer from '~/components/FlashContainer.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import Podcast from '~/components/Podcast.vue';
   import Section from '~/components/Section.vue';
   import SvgIcon from '~/components/SvgIcon.vue';
   import Video from '~/components/Video.vue';

   export default {
      metaInfo: meta({
         title: 'Radio Arcane - Dark Eclectic Music',
         titleTemplate: '%s',
         description: 'Louisville, KY collective specializing in Darkwave, Goth, Post-Punk, Industrial, EBM, Synthwave, and related music events & podcasts.',
         path: '/'
      }),
      components: {
         Btn,
         Center,
         Container,
         Event,
         FlashContainer,
         GridContainer,
         GridItem,
         Heading,
         Podcast,
         Section,
         SvgIcon,
         Video,
      },
   }
</script>

<style lang="scss">
   .event-divider {
      margin:0 0 2em;
      border-bottom: 2px solid hex-to-rgba($white-smoke, 0.5);
   }

   .event-alert {
      background: $black;
      margin: 2.5rem 0;
      padding: 2rem;
      border-radius: 10px;
      border: 2px solid hex-to-rgba($white-smoke, 1);

      > *:last-child {
         margin-bottom: 0;
      }
   }
</style>
