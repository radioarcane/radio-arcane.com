<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Section :padBottom="true">
               <Title>The Dark Market</Title>

               <p>The Dark Market is a curated night time oddities and art market in Louisville, KY.</p>

               <ul class="dm-social-links">
                  <li>
                     <a href="https://www.facebook.com/darkmarketky"
                        target="_blank"
                        title="The Dark Market @ Facebook"
                     >
                        <SvgIcon name="facebook" use="facebook" />
                     </a>
                  </li>
                  <li>
                     <a href="https://www.instagram.com/darkmarketky"
                        target="_blank"
                        title="The Dark Market @ Instagram"
                     >
                        <SvgIcon name="instagram" use="instagram" />
                     </a>
                  </li>
                  <li>
                     <a href="https://twitter.com/darkmarketky"
                        target="_blank"
                        title="The Dark Market @ Twitter"
                     >
                        <SvgIcon name="twitter" use="twitter" />
                     </a>
                  </li>
               </ul>
            </Section>
         </article>

         <Section :padBottom="true">
            <Title>
               Vendors
            </Title>

            <div class="dm-vendors">
               <div class="dm-vendor"
                  v-for="(vendor, index) in vendors"
                  :key="index"
               >
                  <h4 class="dm-vendor__title">
                     {{  vendor.title }}
                  </h4>

                  <div class="dm-vendor__desc" v-if="vendor.description">
                     <p>{{ vendor.description }}</p>
                  </div>

                  <div class="dm-vendor__photos" v-if="vendor.images.length">
                      <div class="dm-vendor__photo"
                        v-for="(img, imgIndex) in vendor.images"
                        :key="imgIndex"
                      >
                        <img :src="img.src" :alt="img.title" />
                     </div>
                  </div>

                  <div class="dm-vendor__links" v-if="vendor.links.length">
                     <ul>
                        <li v-for="(link, linkIndex) in vendor.links" :key="linkIndex">
                           <a :href="link.url" target="_blank" :title="link.title">
                              {{ link.title }}
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </Section>

      </Container>
   </Layout>
</template>

<script>
   import { breadcrumb } from '~/util/jsonLd';
   import meta from '~/util/meta.js';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import Section from '~/components/Section.vue';
   import SvgIcon from '~/components/SvgIcon.vue';
   import Title from '~/components/Title.vue';

   const metaInfo = Object.assign({}, meta({
      title: 'The Dark Market',
      description: 'The Dark Market is a curated night time oddities and art market in Louisville, KY.',
      path: '/dark-market'
   }), {
      script: [
         {
            type: 'application/ld+json',
            vmid: 'ldjson-schema',
            body: true,
            innerHTML: JSON.stringify(breadcrumb([{
               path: '/dark-market',
               name: 'The Dark Market'
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
               name: 'The Dark Market',
               to: '/dark-market'
            }],
            vendors: [{
               title: 'Hugs and Fizzes',
               description: '',
               images: [],
               links: [{
                  title: 'Etsy',
                  url: 'https://www.etsy.com/shop/HugsandFizzes'
               }]
            }, {
               title: 'Plot 13 Studio',
               description: 'We are a husband and wife team, based out of Temple Hill, Kentucky. We make hand painted replica signs, custom signs, props, and wooden magnets.',
               images: [],
               links: [{
                  title: 'Website',
                  url: 'http://www.plot13studio.com'
               }, {
                  title: 'Etsy',
                  url: 'https://www.etsy.com/shop/Plot13studios'
               }, {
                  title: 'Instagram',
                  url: 'https://www.instagram.com/plot13production'
               }]
            }, {
               title: 'Razor Sharp Vic',
               description: 'Handcrafted wire-wrapped jewelry, custom stone and mineral designs, acrylic art pieces, and upcycled wearable wares.',
               images: [],
               links: [{
                  title: 'Website',
                  url: 'https://razorsharpvic.com'
               }]
            }, {
               title: 'Russell Jackson',
               description: 'Portrait artist and illustrator.',
               images: [],
               links: [{
                  title: 'Bigcartel',
                  url: 'https://russelljackson.bigcartel.com'
               }, {
                  title: 'Instagram',
                  url: 'https://www.instagram.com/russelljacksonart'
               }]
            }, {
               title: 'Sara Josephine Clarke',
               description: '',
               images: [],
               links: [{
                  title: 'Website',
                  url: 'https://www.thestillshow.com'
               }, {
                  title: 'Etsy',
                  url: 'https://www.etsy.com/shop/TheRitualChamber'
               }, {
                  title: 'Instagram',
                  url: 'http://www.instagram.com/sucre.malin'
               }, {
                  title: 'Linktree',
                  url: 'https://linktr.ee/SaraJosephineXIII'
               }]
            }, {
               title: 'Travis Bilbrey',
               description: '',
               images: [],
               links: [{
                  title: 'Website',
                  url: 'https://www.icantfeelmyfeelings.com'
               }, {
                  title: 'Instagram',
                  url: 'https://www.instagram.com/icantfeelmyfeelings'
               }]
            }, {
               title: 'The Weeping Goth',
               description: 'Wands : Scepters : Ornamental & Ritual Accoutrements',
               images: [{
                  src: "/img/uploads/dark-market/the-weeping-goth-logo.jpg",
                  title: 'The Weeping Goth Banner'
               }, {
                  src: "/img/uploads/dark-market/motuvius-rex.jpg",
                  title: 'Motuvius Rex'
               }],
               links: [{
                  title: 'Etsy',
                  url: 'https://www.etsy.com/shop/TheWeepingGoth',
               }, {
                  title: 'Instagram',
                  url: 'https://www.instagram.com/the.weeping.goth'
               }]
            }, ]
         };
      }
   }
</script>

<style lang="scss">
   .dm-social-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      font-size: 175%;

      > li {
         padding-right: 0.2em;
      }

      a {
         color: $white;

         &:hover,
         &:focus,
         &:active {
            color: darken($white, 40%);
         }
      }
   }

   .dm-vendors {
      display: flex;
      flex-wrap: wrap;
   }

   .dm-vendor {
      width: 100%;
      padding: 0 0 30px;
      margin: 0 0 30px;
      @include fluid-type($screen-s-min, $screen-xxl-min, 18px, 20px);
      border-bottom: 1px solid hex-to-rgba($white, 0.7);

      /*
      @include breakpoint($screen-m-min) {
         width: 50%;
      }


      @include breakpoint($screen-l-min) {
         width: 33.33333%;
         padding: 30px;
      }
      */

      &__title {

      }

      &__photos {
         display: flex;
         flex-wrap: wrap;
      }

      &__photo {
         max-width: 50%;
         margin: 0 15px 15px 0;

         @include breakpoint($screen-m-min) {
            max-width: 25%;
         }

         @include breakpoint($screen-L-min) {
            margin: 0 30px 30px 0;
         }
      }

      &__desc {
         opacity: 0.8;
      }

      &__links {
         opacity: 0.8;


         ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin: 0;
            padding: 0;
         }

         li {
            position: relative;

            + li {
               &:before {
                  display: inline-block;
                  content: "|";
                  padding: 0 0.5em;
                  position: relative;
               }
            }
         }
      }
   }
</style>
