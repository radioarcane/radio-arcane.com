<template>
   <Layout>
      <Container>
         <article>
            <FlashContainer>
               <p>Radio Arcane is a collective of Louisville dj’s that produce events centered around music predominately focused on the use of the synthesizer. Including: Gothic, Post-Punk, New-Wave, Synthwave, 80's, Minimal, Synthpop, Triphop, EBM, Shoegaze, Industrial, Futurepop, 90's, Dreamwave, Retro-Electro, etc.</p>
            </FlashContainer>
         </article>

         <section v-if="$page.events.edges.length">
            <Heading strike animate uppercase>
               Next Event
            </Heading>

            <Event :event="$page.events.edges[0].node" />

            <Center>
               <Btn to="/events" variant="hollow">
                  <span>Checkout Other Upcoming Events</span>
                  <SvgIcon name="right-open" use="right-open" />
               </Btn>
            </Center>
         </section>

         <hr />

         <section v-if="$page.podcasts.edges.length">
            <h3>Checkout Our Latest Podcast</h3>

            <MixcloudPlayer :url="$page.podcasts.edges[0].node.mixcloudLink" />
         </section>
      </Container>
   </Layout>
</template>

<page-query>
   query HomeData {
      events: allEvent (filter: {expired: { eq: false }}, sortBy: "date", order: ASC, perPage: 1) {
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
               image,
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
               date,
               description,
               shortDescription,
               mixcloudLink,
               soundcloudLink,
            }
         }
      }
   }
</page-query>

<script>
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import Heading from '~/components/Heading.vue';
   import FlashContainer from '~/components/FlashContainer.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import SvgIcon from '~/components/SvgIcon.vue';

   export default {
      metaInfo: {
         title: 'Radio Arcane - Dark Eclectic Music',
         meta: [
            { description: 'Add Meta Description...' }
         ]
      },
      components: {
         Btn,
         Center,
         Container,
         Event,
         FlashContainer,
         Heading,
         MixcloudPlayer,
         SvgIcon,
      },
   }
</script>

<style>
</style>
