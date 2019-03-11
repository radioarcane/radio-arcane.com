<template>
   <Layout>
      <Container class="text-center">
         <Breadcrumb v-bind:crumbs="crumbs" />

         <Title>Events</Title>

          <div v-for="{ node } in $page.allEvent.edges" :key="node.id">
             <p>
               <g-link class="nav-footer__link" v-bind:to="`/events/${node.customSlug}`">
                  {{ node.title }}
               </g-link>
             </p>
          </div>
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
               customSlug,
               title,
               date,
               startDatetime,
               endDatetime,
               image,
               description,
               shortDescription,
               facebookEventLink,
               ticketsLink,
            }
         }
      }
   }
</page-query>

<script>

/*
   options: _id, id, path,
*/

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Events',
         description: 'Add Meta Description...',
      },
      components: {
         Breadcrumb,
         Container,
         Title
      },
      data () {

         console.log('Events this...');
         console.log(this.$page);

         return {
            crumbs: [{
               name: 'Events',
               to: '/events'
            }]
         }
      }
   }
</script>

<style>
</style>
