<template>
   <div class="podcast">

      <div v-if="podcast.image" class="podcast__img">
         <router-link :to="podcast.path">
            <picture v-if="podcast.webp">
               <source :srcset="podcast.webp" type="image/webp">
               <source :srcset="podcast.image" type="image/jpeg">
               <img :src="podcast.image" :alt="podcast.title">
            </picture>

            <img v-if="!podcast.webp"
                 :src="podcast.image"
                 :alt="podcast.title"
            />
         </router-link>
      </div>

      <div class="podcast__content">
         <h3 class="podcast__title">{{ podcast.title }}</h3>

         <p v-if="podcast.shortDescription" class="podcast__blurb">
            {{ podcast.shortDescription }}
         </p>

         <div class="podcast__formats">
            <h4>Listen on:</h4>

            <a v-if="podcast.youtubeLink"
               :href="podcast.youtubeLink"
               target="_blank"
               title="Watch on YouTube"
            >
               <SvgIcon name="youtube" use="youtube" />
            </a>

            <a v-if="podcast.mixcloudLink"
               :href="podcast.mixcloudLink"
               target="_blank"
               title="Listen on Mixcloud"
            >
               <SvgIcon name="mixcloud" use="mixcloud" />
            </a>

            <a v-if="podcast.spotifyLink"
               :href="podcast.spotifyLink"
               target="_blank"
               title="Listen on Spotify"
            >
               <SvgIcon name="spotify" use="spotify" />
            </a>

            <a v-if="podcast.soundcloudLink"
               :href="podcast.soundcloudLink"
               target="_blank"
               title="Listen on SoundCloud"
            >
               <SvgIcon name="soundcloud" use="soundcloud" />
            </a>
         </div>

         <div v-if="podcast.mixcloudLink" class="podcast__player">
            <MixcloudPlayer :url="podcast.mixcloudLink" />
         </div>

         <Center>
            <Btn :to="podcast.path">
               <span>Episode Details</span> <SvgIcon name="right-open" use="right-open" />
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

      &__formats {
         display: flex;
         flex-wrap: wrap;
         justify-content: flex-start;
         align-items: center;
         padding-bottom: 1.5rem;
         @include fluid-type($screen-s-min, $screen-xxl-min, 30px, 50px);

         h4 {
            opacity: 0.8;
            margin-bottom: 0;
         }

         a {
            margin-left: 0.25em;
            @include fluid-type($screen-s-min, $screen-xxl-min, 30px, 50px);
            color: $white;
            transition: all 200ms ease-in-out;

            &:hover,
            &:focus,
            &:active {
               color: darken($white, 40%);
            }
         }
      }


      &__blurb {
         @include fluid-type($screen-s-min, $screen-xxl-min, 18px, 20px);
         opacity: 0.9;
      }
   }
</style>
