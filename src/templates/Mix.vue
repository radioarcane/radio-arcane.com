<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="getCrumbs()" />

         <article>
            <Title>{{ $page.mix.title }}</Title>

            <div v-if="$page.mix.date" class="published-date-mix">
               <p>
                  <time :datetime="$page.mix.date">
                     {{ $page.mix.date | moment("MMM. D, YYYY") }}
                  </time>
               </p>
            </div>

            <div v-if="$page.mix.mixcloudLink">
               <MixcloudPlayer :url="$page.mix.mixcloudLink" />

               <p>
                  <a :href="$page.mix.mixcloudLink" target="_blank">
                     Listen on Mixcloud
                  </a>
               </p>
            </div>

            <div v-if="$page.mix.soundcloudLink">
               <div v-html="$page.mix.soundcloudLink"></div>
               <br />
            </div>

            <div v-html="$page.mix.description" />
         </article>

      </Container>
   </Layout>
</template>

<page-query>
   query Mix ($path: String!) {
     mix (path: $path) {
        id,
        path,
        id,
        slug,
        type,
        title,
        shortTitle,
        djs,
        date,
        description,
        mixcloudLink,
        soundcloudLink,
     }
   }
</page-query>

<script>
   import meta from '~/util/meta.js';
   import { breadcrumb, musicPlaylist, podcastEpisode } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import Playlist from '~/components/Playlist.vue';
   import Section from '~/components/Section.vue';
   import SvgIcon from '~/components/SvgIcon.vue';
   import Title from '~/components/Title.vue';

   export default {
      components: {
         Breadcrumb,
         Btn,
         Center,
         Container,
         GridContainer,
         GridItem,
         MixcloudPlayer,
         Playlist,
         Section,
         SvgIcon,
         Title,
      },
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/mixes',
            name: 'DJ Mixes & Shows'
         }, {
            path: this.$page.mix.path,
            name:  this.$page.mix.title
         }]);

         const metaDescription = (() => {
            let desc = '';

            if (this.$page.mix.description) {
               desc = this.$page.mix.description
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s{2,}/g, ' ')
                  .trim();

               if (desc.length > 255) {
                  desc = desc.substr(0, 252) + '...';
               }
            }

            return desc;
         })();

         return meta({
            title: this.$page.mix.title,
            description: metaDescription,
            path: this.$page.mix.path,
            jsonLdSchema: [
               breadcrumbSchema,
            ].filter(item => item !== null)
         });
      },
      methods: {
         getCrumbs() {
            return [{
               to: '/mixes',
               name: "DJ Mixes & Shows"
            }, {
               name: this.$page.mix.title,
               to: this.$page.mix.path,
            }];
         }
      }
   }
</script>

<style lang="scss">

.published-date-mix {
   text-align: left;
   font-size: 80%;
   opacity: 0.8;
}
</style>
