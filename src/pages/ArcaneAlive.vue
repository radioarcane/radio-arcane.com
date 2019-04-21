<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <!--
         <article>
            <Section :padBottom="true">
               <Title>Arcane Alive!</Title>

               <GridContainer collapse>
                  <GridItem :sizes="{
                     xs: 12,
                     md: 4,
                     lg: 3
                  }">
                     <Center>
                        <figure>
                           <picture>
                              <source srcset="/img/arcane-alive.webp" type="image/webp">
                              <source srcset="/img/arcane-alive.jpg" type="image/jpeg">
                              <img src="/img/arcane-alive.jpg" alt="Arcane Alive!">
                           </picture>
                        </figure>
                     </Center>
                  </GridItem>
                  <GridItem :sizes="{
                     xs: 12,
                     md: 8,
                     lg: 9
                  }">
                     <p>Arcane Alive: A pool of live music performers to help support touring bands and as a means of communication for local bands that would like to play Radio Arcane events at Art Sanctuary and potentially elsewhere. Louisville, KY based but open and inviting to regional acts and touring bands as well as local.</p>
                  </GridItem>
               </GridContainer>
            </Section>
         </article>
      -->

         <Title>Arcane Alive!</Title>

         <Section v-if="$page.nextEvent.edges.length" :padBottom="true">
            <Heading strike animate uppercase>
               Next Live Event
            </Heading>

            <Event :event="$page.nextEvent.edges[0].node" />
         </Section>

         <Section>
            <Heading strike animate uppercase>
               Past Live Events
            </Heading>

            <GridContainer>
               <GridItem
                  v-for="{ node } in $page.pastEvents.edges"
                  :key="node.id"
                  :sizes="{
                     xs: 12, sm: 12, md: 6, lg: 4
                  }"
               >
                  <EventCard :event="node" />
               </GridItem>
            </GridContainer>
         </Section>
      </Container>

      <script v-html="schemas" type="application/ld+json"></script>
   </Layout>
</template>

<page-query>
   query Event {
      nextEvent: allEvent (filter: {expired: { eq: false }, eventType: {eq: "arcane-alive"}}, sortBy: "date", order: ASC, perPage: 1) {
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
      pastEvents: allEvent (filter: {eventType: { eq: "arcane-alive" }, expired: { eq: true }}, sortBy: "date", order: DESC) {
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
               shortDescription,
               expired,
            }
         }
      }
   }
</page-query>

<script>
   import { breadcrumb } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import Event from '~/components/Event.vue';
   import EventCard from '~/components/EventCard.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaTitle = 'Arcane Alive! | Radio Arcane';
   const metaDescription = 'Louisville, KY live music events.';
   const metaImg = 'https://www.radio-arcane.com/img/logo--radio-arcane.png';

   export default {
      metaInfo: {
         title: metaTitle,
         titleTemplate: '%s',
         meta: [
            { description: metaDescription },
            { property: 'og:title', content: metaTitle },
            { property: 'og:site_name', content: 'Radio Arcane' },
            { property: 'og:url', content: 'https://www.radio-arcane.com/arcane-alive' },
            { property: 'og:image', content: metaImg },
            { property: 'og:description', content: metaDescription },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: 'https://www.radio-arcane.com/arcane-alive' },
            { name: 'twitter:title', content: metaTitle },
            { name: 'twitter:description', content: metaDescription },
            { name: 'twitter:creator', content: '@Radio_Arcane' },
            { name: 'twitter:image:src', content: metaImg },

            { itemprop: 'name', content: metaTitle },
            { itemprop: 'description', content: metaDescription },
            { itemprop: 'image', content: metaImg },
         ],
         links: [
            { rel: 'canonical', href: 'https://www.radio-arcane.com/arcane-alive' }
        ]
      },
      components: {
         Breadcrumb,
         Btn,
         Center,
         Container,
         Event,
         EventCard,
         GridContainer,
         GridItem,
         Heading,
         Section,
         Title,
      },
      data () {
         const breadcrumbSchema = breadcrumb([{
            path: '/arcane-alive',
            name: 'Arcane Alive!'
         }]);

         return {
            crumbs: [{
               name: 'Arcane Alive!',
               to: '/arcane-alive'
            }],
            schemas: JSON.stringify(breadcrumbSchema),
         };
      },
   }
</script>
