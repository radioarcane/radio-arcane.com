<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Title>Arcane Alive!</Title>

            <GridContainer>
               <GridItem :sizes="{
                  lg: 3
               }">
                  <figure>
                     <img src="/img/uploads/arcane-alive.jpg" alt="Arcane Alive!" />
                  </figure>
               </GridItem>
               <GridItem :sizes="{
                  lg: 9
               }">
                  <p>Arcane Alive: A pool of live music performers to help support touring bands and as a means of communication for local bands that would like to play Radio Arcane events at Art Sanctuary and potentially elsewhere. Louisville, KY based but open and inviting to regional acts and touring bands as well as local. It can also be a cool way for bands to find other musicians with common interests.( Like, I need a bass player or I need a drummer or I'd like a dj to play between sets etc, etc) It can also be a place to post demos for production advice or constructive criticism. A place to book shows and a place to tell people where bands might be playing regionally.</p>

                  <Btn
                     href="https://www.facebook.com/groups/534478756991487"
                     target="_blank"
                     variant="facebook"
                  >
                     Arcane Alive! Group @ Facebook
                  </Btn>
               </GridItem>
            </GridContainer>
         </article>

         <hr />

         <section>

            <Heading tag="h2">
               Past Events
            </Heading>

            <GridContainer>
               <GridItem
                  v-for="{ node } in $page.allEvent.edges"
                  :key="node.id"
                  :sizes="{
                     xs: 12, sm: 12, md: 6, lg: 4
                  }"
               >
                  <EventCard :event="node" />
               </GridItem>
            </GridContainer>
         </section>
      </Container>
   </Layout>
</template>

<page-query>
   query Event {
      allEvent (filter: {eventType: { eq: "arcane-alive" }}, sortBy: "date", order: DESC) {
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
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Container from '~/components/Container.vue';
   import EventCard from '~/components/EventCard.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Title from '~/components/Title.vue';
   import Heading from '~/components/Heading.vue';

   export default {
      metaInfo: {
         title: 'Arcane Alive!',
         meta: [
            { description: 'Add Meta Description...' }
         ]
      },
      components: {
         Breadcrumb,
         Btn,
         Container,
         GridContainer,
         GridItem,
         Title,
         EventCard,
         Heading,
      },
      data () {
         return {
            crumbs: [{
               name: 'Arcane Alive!',
               to: '/arcane-alive'
            }],
         };
      },
   }
</script>
