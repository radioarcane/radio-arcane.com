<template>
   <Layout>
      <Container>
         <FlashContainer tag="article">
            <p>Radio Arcane is a collective of Dark Music Specialists in Louisville, KY that host events, live music and dark arts entertainment. A podcast featuring music and discussion is also available on Mixcloud and SoundCloud.</p>

            <p>Dark Eclectic Music &ndash; predominately focused on the use of the synthesizer, including: Gothic, Darkwave, Post-Punk, Industrial, EBM, Coldwave, Synthwave, Synthpop, New Wave, Minimal, and related genres.</p>
         </FlashContainer>

         <Section v-if="$page.nextEvent.edges.length">
            <Heading strike animate uppercase tag="h1">
               Next Radio Arcane Event
            </Heading>

            <Event :event="$page.nextEvent.edges[0].node" />
         </Section>

         <Section v-if="$page.nextLiveEvent.edges.length">
            <Heading strike animate uppercase>
               Next Live Event
            </Heading>

            <Event :event="$page.nextLiveEvent.edges[0].node" />
         </Section>

         <Center>
            <Btn to="/events">
               <span>Checkout Upcoming & Past Events</span>
               <SvgIcon name="right-open" use="right-open" />
            </Btn>
         </Center>

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
      </Container>
   </Layout>
</template>

<page-query>
   query HomeData {
      nextEvent: allEvent (filter: {expired: { eq: false }, eventType: {eq: "radio-arcane"}}, sortBy: "date", order: ASC, perPage: 1) {
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
            }
         }
      },
      nextLiveEvent: allEvent (filter: {expired: { eq: false }, eventType: {eq: "arcane-alive"}}, sortBy: "date", order: ASC, perPage: 1) {
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
   import Heading from '~/components/Heading.vue';
   import Podcast from '~/components/Podcast.vue';
   import Section from '~/components/Section.vue';
   import SvgIcon from '~/components/SvgIcon.vue';

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
         Heading,
         Podcast,
         Section,
         SvgIcon,
      },
   }
</script>
