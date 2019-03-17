<template>

   <div class="podcast">
      <div v-if="podcast.image" class="podcast__img">
         <g-link :to="podcast.path">
            <img :src="podcast.image" :alt="podcast.displayName" />
         </g-link>
      </div>

      <div class="podcast__content">
         <h3 class="podcast__title">
            {{ podcast.title }}
         </h3>

         <div v-if="podcast.mixcloudLink" class="podcast__player">
            <MixcloudPlayer :url="podcast.mixcloudLink" />
         </div>

           <p v-if="podcast.shortDescription" class="podcast__blurb">
              {{ podcast.shortDescription }}
           </p>

           <Btn :to="podcast.path" variant="hollow">
              More Info
           </Btn>
      </div>
   </div>
</template>

<script>
   import Btn from '~/components/Btn.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';

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
      },
   };
</script>

<style lang="scss">
/*
$screen-xs-min: 0;
$screen-s-min: 480px;
$screen-m-min: 768px;
$screen-l-min: 992px;
$screen-xl-min: 1200px;
$screen-xxl-min: 1400px;
*/

   .podcast {
      display: flex;
      flex-wrap: wrap;
      margin: 0 0 2rem;

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
