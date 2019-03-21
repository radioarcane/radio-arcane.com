<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="getCrumbs()" />

         <article itemscope itemtype="http://schema.org/AudioObject">
            <Title>
               {{ $page.podcast.title }}
            </Title>

            <meta itemprop="name" :content="`Radio Arcane : ${ $page.podcast.title }`" />

            <meta v-if="$page.podcast.shortDescription"
                  itemprop="description"
                  :content="$page.podcast.shortDescription"
            />

            <GridContainer collapse>
               <GridItem
                  v-if="$page.podcast.image"
                  :sizes="{
                     xs: 12,
                     md: 4,
                     lg: 3
                  }"
                >
                  <Center>
                     <figure>
                        <picture v-if="$page.podcast.webp">
                           <source :srcset="$page.podcast.webp" type="image/webp">
                           <source :srcset="$page.podcast.image" type="image/jpeg">
                           <img :src="$page.podcast.image" :alt="$page.podcast.displayName">
                        </picture>

                        <img v-if="!$page.podcast.webp"
                             :src="$page.podcast.image"
                             :alt="$page.podcast.displayName"
                        />
                     </figure>
                  </Center>
               </GridItem>
               <GridItem :sizes="{
                  xs: 12,
                  md: 8,
                  lg: 9
               }">
                  <div v-if="$page.podcast.date">
                     <p>
                        Published: <time :datetime="$page.podcast.date" itemprop="datePublished" :content="$page.podcast.date">
                           {{ $page.podcast.date | moment("MMM. D, YYYY") }}
                        </time>
                     </p>
                  </div>

                  <div v-html="$page.podcast.description" />
               </GridItem>
               <GridItem :sizes="{
                  xs: 12
               }" padTop>
                  <meta itemprop="encodingFormat" content="audio/mpeg" />
                  <meta itemprop="contentUrl" :content="$page.podcast.mixcloudLink" />
                  <meta itemprop="playerType" content="HTML5" />



                  <noscript>
                     <Btn :href="$page.podcast.mixcloudLink" :target="_blank" :variant="hollow">
                        Click Here To Listen
                     </Btn>
                  </noscript>
               </GridItem>
            </GridContainer>
         </article>
      </Container>
   </Layout>
</template>

<page-query>
   query Podcast ($path: String!) {
     podcast (path: $path) {
        id,
        path,
        slug,
        title,
        date,
        description,
        shortDescription,
        image,
        webp,
        mixcloudLink,
        soundcloudLink,
        playlist {
           sets {
              tracks {
                 artist,
                 song,
                 artistLinks {
                    appleMusic,
                    bandcamp,
                    facebook,
                    googleMusic,
                    instagram,
                    soundcloud,
                    spotify,
                    twitter,
                    website,
                    youtube
                 }
              }
           }
        }
     }
   }
</page-query>

<script>
   import Layout from '~/layouts/Default.vue'

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import Title from '~/components/Title.vue';
   //import LazyHydrate from 'vue-lazy-hydration';


/*
<MixcloudPlayer :url="$page.podcast.mixcloudLink" />
*/
   export default {
      components: {
         Layout,
         Breadcrumb,
         Btn,
         Center,
         Container,
         GridContainer,
         GridItem,
         //MixcloudPlayer,
         Title,
         //LazyHydrate,
         //MixcloudPlayer: () => import('~/components/MixcloudPlayer.vue'),
      },
      metaInfo () {
         return {
            title: this.$page.podcast.title,
            meta: [
               { description: 'Add Meta Description...' }
            ]
         }
      },
      methods: {
         getCrumbs() {
            return [{
               to: '/podcasts',
               name: "Podcasts"
            }, {
               name: this.$page.podcast.title
            }];
         }
      }
   }
</script>

<style lang="scss">
</style>
