<template>
   <Layout>
      <Container>
         <article>
            <FlashContainer>
               <p>Radio Arcane is a collective of Louisville dj’s that produce events centered around music predominately focused on the use of the synthesizer. Including: Gothic, Post-Punk, New-Wave, Synthwave, 80's, Minimal, Synthpop, Triphop, EBM, Shoegaze, Industrial, Futurepop, 90's, Dreamwave, Retro-Electro, etc.</p>
            </FlashContainer>
         </article>

         <Section v-if="$page.nextEvent.edges.length">
            <Heading strike animate uppercase>
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

         <Section v-if="$page.nextEvent.edges.length || $page.nextLiveEvent.edges.length">
            <Center>
               <Btn to="/events" variant="hollow">
                  <span>Checkout Upcoming & Past Events</span>
                  <SvgIcon name="right-open" use="right-open" />
               </Btn>
            </Center>
         </Section>


         <Section v-if="$page.podcasts.edges.length">
            <Heading strike animate uppercase tag="h3">
               Latest Podcast
            </Heading>

            <Podcast :podcast="$page.podcasts.edges[0].node" />

            <Center>
               <Btn to="/podcasts" variant="hollow">
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
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import Heading from '~/components/Heading.vue';
   import FlashContainer from '~/components/FlashContainer.vue';
   import Section from '~/components/Section.vue';
   import SvgIcon from '~/components/SvgIcon.vue';
   import Podcast from '~/components/Podcast.vue';

   const metaTitle = 'Radio Arcane - Dark Eclectic Music';
   const metaDescription = 'Louisville, KY collective specializing in Darkwave, Goth, Post-Punk, Industrial, EBM, Synthwave, and related music events & podcasts.';
   const metaImg = 'https://www.radio-arcane.com/img/logo--radio-arcane.png';

   export default {
      metaInfo: {
         title: metaTitle,
         titleTemplate: '%s',
         meta: [
            { description: metaDescription },
            { property: 'og:title', content: metaTitle },
            { property: 'og:site_name', content: 'Radio Arcane' },
            { property: 'og:url', content: 'https://www.radio-arcane.com' },
            { property: 'og:image', content: metaImg },
            { property: 'og:description', content: metaDescription },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: 'https://www.radio-arcane.com' },
            { name: 'twitter:title', content: metaTitle },
            { name: 'twitter:description', content: metaDescription },
            { name: 'twitter:creator', content: '@Radio_Arcane' },
            { name: 'twitter:image:src', content: metaImg },

            { itemprop: 'name', content: metaTitle },
            { itemprop: 'description', content: metaDescription },
            { itemprop: 'image', content: metaImg },
         ],
         links: [
            { rel: 'canonical', href: 'https://www.radio-arcane.com' }
        ]
      },
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


      /*
      computed: {
         nextEvent: {
            get: function () {
               const node = this.$page.events.edges.find(edge => {
                  return edge.node.eventType === 'radio-arcane';
               });

               console.log(node);

               return node ? node : null;
            }
         },
         nextLiveEvent: {
            get: function () {
               return this.$page.events.edges.find(event => event.eventType === 'arcane-alive');
            }
         }
      }
      */
   }
</script>

<style>
</style>
