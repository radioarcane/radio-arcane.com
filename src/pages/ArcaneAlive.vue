<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <Title>Arcane Alive!</Title>

         <article>
            <Section :padBottom="true">
               <p>
                  If you are a music act interested in playing a live show at <a href="https://www.facebook.com/pages/category/Arts---Entertainment/Art-Sanctuary-122260903695" target="_blank">Art Sanctuary</a> in Louisville, Kentucky with a style that could be identified as Darkwave, Post-Punk, Coldwave, Gothic, Industrial, EBM, Synthwave, Minimal Synth, Synthpop, New Wave, etc... feel free to reach out to us on <a href="https://www.facebook.com/RadioArcaneEvents/" target="_blank">social media</a>.
               </p>
            </Section>
         </article>


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
   import meta from '~/util/meta.js';
   import { breadcrumb, musicEvent } from '~/util/jsonLd';

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

   export default {
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/arcane-alive',
            name: 'Arcane Alive!'
         }]);

         const eventsSchema = [];

         if (this.$page.nextEvent.edges.length) {
            eventsSchema.push(musicEvent(this.$page.nextEvent.edges[0].node));
         }

         this.$page.pastEvents.edges.forEach(ev => {
            eventsSchema.push(musicEvent(ev.node));
         });

         const metaImage = (() => {
            if (this.$page.nextEvent.edges.length && this.$page.nextEvent.edges[0].node.image) {
               return this.$page.nextEvent.edges[0].node.image;
            }

            const pastEventsWithImg = this.$page.pastEvents.edges.filter(ev => {
               return ev.node.image && ev.node.image.length > 0;
            }).reverse();

            if (pastEventsWithImg.length) {
               return pastEventsWithImg[0].node.image;
            }

            return null;
         })();

         return meta({
            title: 'Arcane Alive!',
            description: 'Louisville, KY live concerts focusing on artists in the Darkwave, Gothic, Post-Punk, Coldwave, Industrial, EBM, Synthwave, and related genres.',
            path: '/arcane-alive',
            image: metaImage,
            jsonLdSchema: [breadcrumbSchema].concat(eventsSchema)
         });
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
