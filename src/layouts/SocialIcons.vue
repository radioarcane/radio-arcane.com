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
   import SvgIcon from '~/components/SvgIcon.vue';

   export default {
      components: {
         SvgIcon,
      },
      data () {
         return {
            socialLinks: [{
               name: 'Facebook',
               url: 'https://www.facebook.com/pg/RadioArcaneEvents',
               icon: 'facebook',
            }, {
               name: 'Instagram',
               url: 'https://www.instagram.com/radio_arcane',
               icon: 'instagram',
            }, {
               name: 'Twitter',
               url: 'https://twitter.com/Radio_Arcane',
               icon: 'twitter',
            }, {
               name: 'Mixcloud',
               url: 'https://www.mixcloud.com/Radio-Arcane',
               icon: 'mixcloud',
            }, {
               name: 'Soundcloud',
               url: 'https://soundcloud.com/radio_arcane',
               icon: 'soundcloud',
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
         margin: 0 0.25em;
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
