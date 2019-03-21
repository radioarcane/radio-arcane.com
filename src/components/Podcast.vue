<template>
   <div class="podcast" itemscope itemtype="http://schema.org/AudioObject">
      <meta itemprop="name" :content="`Radio Arcane : ${ podcast.title }`" />
      <meta v-if="podcast.date" itemprop="datePublished" :content="podcast.date" />

      <div v-if="podcast.image" class="podcast__img">
         <g-link :to="podcast.path">
            <picture v-if="podcast.webp">
               <source :srcset="podcast.webp" type="image/webp">
               <source :srcset="podcast.image" type="image/jpeg">
               <img :src="podcast.image" :alt="podcast.displayName">
            </picture>

            <img v-if="!podcast.webp"
                 :src="podcast.image"
                 :alt="podcast.displayName"
            />
         </g-link>
      </div>

      <div class="podcast__content">
         <h3 class="podcast__title">
            {{ podcast.title }}
         </h3>

         <p v-if="podcast.shortDescription"
            class="podcast__blurb"
            itemprop="description"
         >
            {{ podcast.shortDescription }}
         </p>

         <div v-if="podcast.mixcloudLink" class="podcast__player">
            <meta itemprop="encodingFormat" content="audio/mpeg" />
            <meta itemprop="contentUrl" :content="podcast.mixcloudLink" />
            <meta itemprop="playerType" content="HTML5" />
            <MixcloudPlayer :url="podcast.mixcloudLink" />
         </div>

         <Btn :to="podcast.path" variant="hollow">
            <span>More Info</span> <SvgIcon name="right-open" use="right-open" />
         </Btn>
      </div>
   </div>
</template>

<script>
   import Btn from '~/components/Btn.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import SvgIcon from '~/components/SvgIcon.vue';

   /*
   <noscript>
      <a :href="podcast.mixcloudLink" target="_blank">Click Here to Listen</a>
   </noscript>
   */

   //import LazyHydrate from 'vue-lazy-hydration';

/*
   <MixcloudPlayer :url="podcast.mixcloudLink" />
*/

   /*
   <LazyHydrate when-visible>
      <MixcloudPlayer :url="podcast.mixcloudLink" />
   </LazyHydrate>
   */

   export default {
      name: 'Podcast',
      props: {
         podcast: {
            type: Object
         }
      },
      components: {
         Btn,
         MixcloudPlayer,
         //LazyHydrate,
         //MixcloudPlayer: () => import('./MixcloudPlayer.vue'),
         SvgIcon,
      }
   };
</script>

<style lang="scss">
   .podcast {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid hex-to-rgba($white-smoke, 0.4);
      border-radius: 8px;
      margin: 0 0 2rem;
      padding: 1rem $gutter-width/2;

      @include breakpoint($screen-l-min) {
         padding-left: $gutter-width;
         padding-right: $gutter-width;
      }

      &__title {

      }

      &__img {
         display: none;

         @include breakpoint($screen-l-min) {
            display: block;
            width: 300px + $gutter-width;
            margin: 0 0 1.5rem;
            padding-right: $gutter-width;
         }
      }

      &__content {
         width: 100%;

         @include breakpoint($screen-l-min) {
            width: calc(100% - 330px);
         }
      }

      &__player {

      }

      &__blurb {
         @include fluid-type($screen-s-min, $screen-xxl-min, 18px, 20px);
      }
   }
</style>
