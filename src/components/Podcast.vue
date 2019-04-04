<template>
   <div class="podcast">

      <div v-if="podcast.image" class="podcast__img">
         <router-link :to="podcast.path">
            <picture v-if="podcast.webp">
               <source :srcset="podcast.webp" type="image/webp">
               <source :srcset="podcast.image" type="image/jpeg">
               <img :src="podcast.image" :alt="podcast.displayName">
            </picture>

            <img v-if="!podcast.webp"
                 :src="podcast.image"
                 :alt="podcast.displayName"
            />
         </router-link>
      </div>

      <div class="podcast__content">
         <h3 class="podcast__title">
            {{ podcast.title }}
         </h3>

         <p v-if="podcast.shortDescription"
            class="podcast__blurb"
         >
            {{ podcast.shortDescription }}
         </p>

         <div v-if="podcast.mixcloudLink" class="podcast__player">
            <MixcloudPlayer :url="podcast.mixcloudLink" />
         </div>

         <Center>
            <Btn :to="podcast.path">
               <span>Playlist & Further Details</span> <SvgIcon name="right-open" use="right-open" />
            </Btn>
         </Center>
      </div>
   </div>
</template>

<script>
   import Btn from './Btn.vue';
   import Center from './Center.vue';
   import MixcloudPlayer from './MixcloudPlayer.vue';
   import SvgIcon from './SvgIcon.vue';

   export default {
      name: 'Podcast',
      props: {
         podcast: {
            type: Object
         }
      },
      components: {
         Btn,
         Center,
         MixcloudPlayer,
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
         margin: 0 0 1rem;
      }

      &__img {
         text-align: center;
         margin: 0 auto 1.25rem;
         width: 100%;
         max-width: 400px;

         @include breakpoint($screen-m-min) {
            display: none;
         }

         @include breakpoint($screen-l-min) {
            width: 300px + $gutter-width;
            display: block;
            padding-right: $gutter-width;
         }

         /* IE Fix */
         a {
            display: block;
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
         opacity: 0.9;
      }
   }
</style>
