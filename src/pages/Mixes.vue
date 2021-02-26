<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <Title>DJ Mixes & Shows</Title>

         <Section :padBottom="true">

            <Heading>Sorrow-Vomit</Heading>

            <ul>

            </ul>
         </Section>




      </Container>
   </Layout>
</template>

<page-query>
   query  {
      mixes: allMix (sortBy: "date", order: DESC) {
         edges {
            node {
               id,
               slug,
               type,
               title,
               shortTitle,
               djs,
               date,
               description,
               mixcloudLink,
            }
         }
      }
   }
</page-query>

<script>
   import { breadcrumb } from '~/util/jsonLd';
   import meta from '~/util/meta.js';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaInfo = Object.assign({}, meta({
      title: 'DJ Mixes & Shows',
      description: '',
      path: '/radio'
   }), {
      script: [
         {
            type: 'application/ld+json',
            vmid: 'ldjson-schema',
            body: true,
            innerHTML: JSON.stringify(breadcrumb([{
               path: '/mixes',
               name: 'DJ Mixes & Shows'
            }]))
         },
      ],
      __dangerouslyDisableSanitizersByTagID: {
         'ldjson-schema': ['innerHTML']
      }
   });

   export default {
      metaInfo: metaInfo,
      components: {
         Breadcrumb,
         Btn,
         Center,
         Container,
         GridContainer,
         GridItem,
         Heading,
         Section,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'DJ Mixes & Shows',
               to: '/mixes'
            }],
            mixes: {}
         };
      },
      methods: {
         getByDj: function(dj) {
            if (this.mixes.hasOwnProperty(dj)) {
               return this.mixes[dj];
            }

            return [];

            //return this.mixes.filter(mix => mix.djs.indexOf(dj) >= 0);
         }
      },
      mounted() {
      },
      created() {
         let data = {
            'ww': [],
            'ra': [],
         };

         this.$page.mixes.edges.map((node, i) => {
            let item = node.node;

            console.log(item);

            item.djs.forEach(dj => {
               console.log(dj);
               if (data.hasOwnProperty(dj) === false) {
                  data[dj] = [];
               }

               data[dj].push(item);
            });

            if (item.type === 'ww') {
               data.ww.push(item);
            }

            if (item.type === 'ra') {
               data.ra.push(item);
            }
         });

         this.mixes = data;
      }
   }
</script>

<style lang="scss">
</style>
