<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article v-if="getNextEvents($page.allEvent.edges, 3).length > 1">
            <Heading tag="h1" strike uppercase animate>
               Next Events
            </Heading>

            <div
               v-for="node in getNextEvents($page.allEvent.edges, 10)"
               :key="node.id"
               class="event-divider"
            >
               <Event :event="node" />
            </div>

         </article>

         <article v-if="getNextEvents($page.allEvent.edges, 3).length === 1">
            <Heading tag="h1" strike uppercase animate>
               Next Event
            </Heading>

            <Event :event="getNextEvent($page.allEvent.edges)" />
         </article>

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

         <div v-if="$page.convergenceEvent.edges.length">
            <Section v-if="totalFutureEvents" :padBottom="true">
               <Title tag="h2">
                  Convergence 26 Festival: May 15 - May 17, 2020
               </Title>

               <Event :event="$page.convergenceEvent.edges[0].node" />
            </Section>
         </div>

         <Section v-if="totalFutureEvents" :padBottom="true">
            <Title tag="h2">
               Upcoming Event Schedule
            </Title>

            <ul>
               <li v-for="{ node } in getFutureEvents($page.allEvent.edges)" :key="node.id">
                  <a v-if="node.facebookEventLink" :href="node.facebookEventLink" target="_blank">
                     {{ node.date | moment("dddd, MMMM D, YYYY") }} &ndash; {{ node.displayName }}
                  </a>

                  <span v-if="!node.facebookEventLink">
                     {{ node.date | moment("dddd, MMMM D, YYYY") }} &ndash; {{ node.displayName }}
                  </span>
               </li>
            </ul>
         </Section>
      -->


         <Section v-if="$page.nextWarpedWedEvent.edges.length > 0" :padTop="true">
            <Heading tag="h3" strike uppercase animate>
               Next Warped Wednesday
            </Heading>

            <Event :event="$page.nextWarpedWedEvent.edges[0].node" />
         </Section>


         <Section :padBottom="true">
            <Heading tag="h3" strike uppercase animate>
               Past Events
            </Heading>

            <GridContainer>
               <GridItem
                  v-for="{ node } in getPastEvents($page.allEvent.edges, true)"
                  :key="node.id"
                  :sizes="{
                     xs: 12, sm: 12, md: 6, lg: 4
                  }"
               >
                  <EventCard :event="node" />
               </GridItem>
            </GridContainer>

            <Center v-if="totalPastEvents > pageSize">
               <Btn @click.native="pageSize += pageSize" variant="hollow">
                  <span>Load More</span> <SvgIcon use="angle-down" name="angle-down" />
               </Btn>
            </Center>
         </Section>
      </Container>
   </Layout>
</template>

<page-query>
   query Event {
      allEvent (filter: {
         eventType: {ne: "warped-wednesday"},
         cancelled: { ne: true}
      }, sortBy: "date", order: DESC) {
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
               cancelled,
               image,
               webp,
               pageImage,
               pageImageWebp,
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
         cancelled: { ne: true }
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
               cancelled,
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
      nextWarpedWedEvent: allEvent (filter: {expired: { eq: false }, eventType: {eq: "warped-wednesday"},cancelled: { ne: true}}, sortBy: "date", order: ASC, perPage: 1) {
         edges {
            node {
               id,
               path,
               slug,
               title,
               cancelled,
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
   import SvgIcon from '~/components/SvgIcon.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/events',
            name: 'Events'
         }]);

         const eventsSchema = this.$page.allEvent.edges.map(ev => musicEvent(ev.node));

         const nextEvents = this.$page.allEvent.edges.filter(ev => {
            return ev.node.expired === false && ev.node.image && ev.node.eventType !== 'warped-wednesday';
         });

         const pastEvents = this.$page.allEvent.edges.filter(ev => {
            return ev.node.expired === true && ev.node.image && ev.node.eventType !== 'warped-wednesday';
         }).reverse();

         const metaImage = (() => {
            if (nextEvents.length) {
               return nextEvents[0].node.image;
            }

            if (pastEvents.length) {
               return pastEvents[0].node.image;
            }

            return null;
         })();

         return meta({
            title: 'Events',
            description: 'Louisville, KY dark music events focusing on Darkwave, Post-Punk, Gothic, Synthwave, EBM, Industrial, Synthpop, and related.',
            path: '/events',
            image: metaImage,
            jsonLdSchema: [breadcrumbSchema].concat(eventsSchema)
         })
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
         SvgIcon,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'Events',
               to: '/events'
            }],
            pageSize: 6
         }
      },
      methods: {
         getNextEvent (events = []) {
            let nextEvent = null;

            if (!events.length) {
               return null;
            }

            let upcomingEvents = events
                                 .filter(ev => ev.node.expired === false && ev.node.eventType !== 'warped-wednesday')
                                 .map(ev => ev.node);

            if (upcomingEvents.length) {
               return upcomingEvents[upcomingEvents.length-1];
            }

            return null;

            //return events[events.length-1].node;
         },
         getNextEvents (events = [], limit = 1) {
            let nextEvents = [];

            if (!events.length) {
               return [];
            }

            let upcomingEvents = events
                                 .filter(ev => ev.node.expired === false && ev.node.eventType !== 'warped-wednesday')
                                 .reverse()
                                 .map(ev => ev.node);

            if (upcomingEvents.length) {
               return upcomingEvents.slice(0, limit);
            }

            //return [events[events.length-1].node];
            return [];
         },
         getPastEvents (events = [], paginate = false) {
            const nextEvent = this.getNextEvent(events);
            let eventId = null;

            if (nextEvent) {
               eventId = nextEvent.id;
            }

            const pastEvents = events.filter(ev => {
               if (ev.node.id === eventId) {
                  return false;
               }

               return ev.node.expired === true;
            });

            return paginate ? pastEvents.slice(0, this.pageSize) : pastEvents;
         },
         getFutureEvents (events = []) {
            const nextEvent = this.getNextEvent(events);
            let eventId = null;

            if (nextEvent) {
               eventId = nextEvent.id;
            }

            return events.filter(ev => {
               /*
               if (ev.node.id === eventId) {
                  return false;
               }
               */

               return ev.node.expired === false;
            }).reverse();
         },
      },
      computed: {
         totalPastEvents: function() {
            return this.getPastEvents(this.$page.allEvent.edges).length;
         },
         totalFutureEvents: function() {
            return this.getFutureEvents(this.$page.allEvent.edges).length;
         }
      }
   }
</script>

<style lang="scss">
   .event-divider {
      margin: 0 0 2em;
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
