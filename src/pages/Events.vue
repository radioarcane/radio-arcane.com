<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article v-if="getNextEvent($page.allEvent.edges)">
            <Heading tag="h1" strike uppercase animate>
               Next Event
            </Heading>

            <Event :event="getNextEvent($page.allEvent.edges)" />
         </article>

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

         <Section>
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
      allEvent (sortBy: "date", order: DESC) {
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
      }
   }
</page-query>

<script>
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
      metaInfo: {
         title: 'Events',
         meta: [
            { description: 'Add Meta Description...' }
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
         SvgIcon,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'Events',
               to: '/events'
            }],
            pageSize: 6,
         };
      },
      methods: {
         getNextEvent (events = []) {
            let nextEvent = null;

            if (!events.length) {
               return null;
            }

            let upcomingEvents = events
                                 .filter(ev => ev.node.expired === false)
                                 .map(ev => ev.node);

            if (upcomingEvents.length) {
               return upcomingEvents[upcomingEvents.length-1];
            }

            return events[events.length-1].node;
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
               if (ev.node.id === eventId) {
                  return false;
               }

               return ev.node.expired === false;
            }).reverse();
         }
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
