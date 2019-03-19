<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Section>
               <Title>Arcane Alive!</Title>

               <GridContainer>
                  <GridItem :sizes="{
                     lg: 3
                  }">
                     <figure>
                        <picture>
                           <source srcset="/img/arcane-alive.webp" type="image/webp">
                           <source srcset="/img/arcane-alive.jpg" type="image/jpeg">
                           <img src="/img/arcane-alive.jpg" alt="Arcane Alive!">
                        </picture>
                     </figure>
                  </GridItem>
                  <GridItem :sizes="{
                     lg: 9
                  }">
                     <p>Arcane Alive: A pool of live music performers to help support touring bands and as a means of communication for local bands that would like to play Radio Arcane events at Art Sanctuary and potentially elsewhere. Louisville, KY based but open and inviting to regional acts and touring bands as well as local.</p>

                     <Btn
                        href="https://www.facebook.com/groups/534478756991487"
                        target="_blank"
                        variant="facebook"
                     >
                        Arcane Alive! Group @ Facebook
                     </Btn>
                  </GridItem>
               </GridContainer>
            </Section>
         </article>

         <Section>
            <Heading strike animate uppercase>
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
         </Section>
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
   import Heading from '~/components/Heading.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Arcane Alive! | Radio Arcane',
         meta: [
            { description: 'Add Meta Description...' }
         ]
      },
      components: {
         Breadcrumb,
         Btn,
         Container,
         EventCard,
         GridContainer,
         GridItem,
         Heading,
         Section,
         Title,
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
