<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <Title>DJ Mixes & Shows</Title>

         <Section :padBottom="true">

            <label for="mix-filter">
               Filter by DJ / Event Type / Show:
            </label>

            <select id="mix-filter" v-model="filter">
               <option value=""">Show All</option>
               <optgroup label="DJ">
                  <option value="Kaleidoscope">Kaleidoscope</option>
                  <option value="Motuvius Rex">Motuvius Rex</option>
                  <option value="Scary Black">Scary Black</option>
                  <option value="Sorrow-Vomit">Sorrow-Vomit</option>
                  <option value="Talamasca">Talamasca</option>
               </optgroup>
               <optgroup label="Event">
                  <option value="Radio Arcane">Radio Arcane</option>
                  <option value="Warped Wednesday">Warped Wednesday</option>
               </optgroup>
               <optgroup label="Show">
                  <option value="Pestilence Party">Pestilence Party</option>
                  <option value="Wave Runner">Wave Runner</option>
               </optgroup>
            </select>


            <div v-for="key in Object.keys(getMixes(mixes))" :key="key">
               <h4>{{ key }}</h4>

               <ul class="mixlist">
                  <li v-for="node in mixes[key]" :key="node.id" v-if="filter == '' || node.filters.indexOf(filter) >= 0"
                      class="mixlist__item"
                  >
                     <div class="mixlist__cover">
                        <a v-if="node.cover" :href="'/mixes/' + node.slug">
                           <img v-lazy="node.cover" :alt="node.title" />
                        </a>
                     </div>
                     <div class="mixlist__title">
                        <a :href="'/mixes/' + node.slug" class="mixlist__link">
                           {{ node.title }}
                        </a>
                     </div>
                     <div class="mixlist__icons">
                        <a v-if="node.mixcloudLink" :href="node.mixcloudLink" target="_blank" class="mixlist__mixcloud" title="Listen on Mixcloud">
                           <SvgIcon use="mixcloud" name="Mixcloud" />
                        </a>
                     </div>
                  </li>
               </ul>
            </div>
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
               filters,
               date,
               description,
               mixcloudLink,
               cover,
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
   import SvgIcon from '~/components/SvgIcon';
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
         SvgIcon,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'DJ Mixes & Shows',
               to: '/mixes'
            }],
            filter: "",
            filters: [],
            mixes: {},
         };
      },
      methods: {
         getMixes () {
            const filter = this.filter;
            const mixes = this.mixes;

            let filteredMix = {};

            Object.keys(mixes).forEach(key => {

               if (!filter) {
                  filteredMix[key] = mixes[key];
               }
               else {
                  let matchMixes = mixes[key].filter(item => item.filters.indexOf(filter) >= 0);

                  if (matchMixes.length) {
                     filteredMix[key] = matchMixes;
                  }
               }
            });

            return filteredMix;
         }
      },
      created() {
         let data = {};
         let filters = [];

         const months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September',
            'October', 'November', 'December',
         ];

         this.$page.mixes.edges.map((node, i) => {
            let item = node.node;

            const dateParts = item.date.toString().split('-')
            const year = dateParts[0];
            const month = dateParts[1];
            const monthIndex = parseInt(month) - 1;
            const dateKey = `${ months[monthIndex] } ${ year }`;

            if (data.hasOwnProperty(dateKey) === false){
               data[dateKey] = [];
            }

            data[dateKey].push(Object.assign({}, item, {
               year: year,
               month: month,
            }));

            filters = filters.concat(item.filters);
         });

         this.filters = [...new Set(filters)].sort();
         this.mixes = data;
      }
   }
</script>

<style lang="scss">

   #mix-filter {
      font-size: 16px;
      max-width: 250px;
   }

   .mixlist {
      list-style: none;
      padding: 0;
      margin-left: 0;

      &__item {
         display: flex;
         flex-wrap: nowrap;
         justify-content: flex-start;
         align-items: center;
         align-content: center;
         padding-bottom: 0.5em;
         width: 100%;
      }

      &__cover {
         width: 75px;

         @include breakpoint($screen-m-min) {
            width: 100px;
         }
      }

      &__title {
         padding-left: 15px;
         padding-right: 15px;
         width: calc(100% - 125px);

         @include breakpoint($screen-l-min) {
            width: auto;
            padding-left: 30px;
            padding-right: 30px;
         }
      }

      &__icons {
         width: 50px;
      }

      &__link {
         display: inline;
         vertical-align: top;
         margin-right: 0.5em;
      }

      &__mixcloud {
         display: inline-block;
         vertical-align: middle;
         font-size: 125%;
         line-height: 1;
         color: $white;
         opacity: 0.75;
         transition: all 150ms ease-in-out;
         transform: scale(1);
         border: 1px solid $white;

         &:active,
         &:hover,
         &:focus {
            color: $white;
            opacity: 1;
            transform: scale(1.1);
         }
      }
   }

   /*
   .mixlist {
      &__link {
         display: inline;
         vertical-align: top;
         margin-right: 0.5em;
      }

      &__mixcloud {
         display: inline-block;
         vertical-align: middle;
         font-size: 125%;
         line-height: 1;
         color: $white;
         opacity: 0.75;
         transition: all 150ms ease-in-out;
         transform: scale(1);
         border: 1px solid $white;

         &:active,
         &:hover,
         &:focus {
            color: $white;
            opacity: 1;
            transform: scale(1.1);
         }
      }
   }
   */
</style>
