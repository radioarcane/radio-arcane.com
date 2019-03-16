<template>
   <Layout>
      <Container>
         <article>
            <Title>{{ $page.podcast.title }}</Title>

            <div style="text-align: right;" v-if="$page.podcast.date">
               <p>
                  Published: <time b-bind:datetime="$page.podcast.date">
                     {{ $page.podcast.date | moment("MMM. D, YYYY") }}
                  </time>
               </p>
            </div>

            <MixcloudPlayer
               v-if="$page.podcast.mixcloudLink"
               v-bind:url="$page.podcast.mixcloudLink"
            />

            <div v-html="$page.podcast.description" />
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

   import Btn from '~/components/Btn.vue';
   import Container from '~/components/Container.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import Title from '~/components/Title.vue';

   export default {
      components: {
         Layout,
         Container,
         MixcloudPlayer,
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
      data () {
         return {};
      }
   }
</script>

<style lang="scss">
</style>
