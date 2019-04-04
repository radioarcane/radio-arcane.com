<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="getCrumbs()" />

         <article>
            <Title>
               {{ $page.podcast.title }}
            </Title>

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
                  md: $page.podcast.image ? 8 : 12,
                  lg: $page.podcast.image ? 9 : 12
               }">
                  <div v-if="$page.podcast.date">
                     <p>
                        Published: <time :datetime="$page.podcast.date">
                           {{ $page.podcast.date | moment("MMM. D, YYYY") }}
                        </time>
                     </p>
                  </div>

                  <div v-html="$page.podcast.description" />
               </GridItem>
               <GridItem :sizes="{
                  xs: 12
               }" padTop>
                  <MixcloudPlayer :url="$page.podcast.mixcloudLink" />
               </GridItem>
            </GridContainer>
         </article>

         <hr />

         <section v-if="$page.podcast.playlist">
            <h2>Playlist</h2>

            <Playlist
               :playlist="$page.podcast.playlist"
               :showHeader="false"
            />
         </section>
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
   import Layout from '~/layouts/Default'

   import Breadcrumb from '~/components/Breadcrumb';
   import Btn from '~/components/Btn';
   import Center from '~/components/Center';
   import Container from '~/components/Container';
   import GridContainer from '~/components/GridContainer';
   import GridItem from '~/components/GridItem';
   import MixcloudPlayer from '~/components/MixcloudPlayer';
   import Playlist from '~/components/Playlist';
   import Title from '~/components/Title';

   export default {
      components: {
         Layout,
         Breadcrumb,
         Btn,
         Center,
         Container,
         GridContainer,
         GridItem,
         MixcloudPlayer,
         Playlist,
         Title
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
