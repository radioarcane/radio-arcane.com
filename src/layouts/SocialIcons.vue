<template>
   <div class="social-icons">
      <a v-for="icon in socialLinks"
         class="social-icons__icon"
         :key="icon.icon"
         :href="icon.url"
         target="_blank"
         :title="`Follow Radio Arcane on ${ icon.name }`"
      >
         <SvgIcon :name="icon.icon" :use="icon.icon" />
      </a>
   </div>
</template>

<script>
   import config from '~/config.js';

   import SvgIcon from '~/components/SvgIcon';

   export default {
      components: {
         SvgIcon,
      },
      data () {
         return {
            socialLinks: [{
               name: 'Facebook',
               url: config.facebook,
               icon: 'facebook',
            }, {
               name: 'Instagram',
               url: config.instagram,
               icon: 'instagram',
            },{
               name: 'Twitch',
               url: config.twitch,
               icon: 'twitch',
            }, {
               name: 'YouTube',
               url: config.youtube,
               icon: 'youtube',
            },  {
               name: 'Twitter',
               url: config.twitter,
               icon: 'twitter',
            }, {
               name: 'Mixcloud',
               url: config.mixcloud,
               icon: 'mixcloud',
            }, {
               name: 'Spotify',
               url: config.spotify,
               icon: 'spotify'
            }]
         };
      }
   }
</script>

<style lang="scss">
   .social-icons {
      &__icon {
         color: $white;
         transition: all 200ms ease-in-out;
         display: inline-block;
         vertical-align: middle;
         line-height: 1;
         line-height: 1em;
         margin: 0 0.15em;
         text-align: center;
         text-decoration: none;
         @include fluid-type($screen-s-min, $screen-xxl-min, 30px, 50px);

         @include breakpoint($screen-m-min) {
            top: 1em;
         }

         &:hover,
         &:focus,
         &:active {
            color: darken($white, 40%);
         }
      }
   }
</style>
