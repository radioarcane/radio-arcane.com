<template>
   <div class="social-icons">
      <a
         href="https://www.facebook.com/pg/RadioArcaneEvents"
         target="_blank"
         title="Follow Radio Arcane on Facebook"
         aria-label="Follow Radio Arcane on Facebook"
      >
         <SvgIcon name="facebook" use="facebook" />
      </a>

      <a
         href="https://www.instagram.com/radio_arcane/"
         target="_blank"
         title="Follow Radio Arcane on Instagram"
         aria-label="Follow Radio Arcane on Instagram"
      >
         <SvgIcon name="instagram" use="instagram" />
      </a>

      <a
         href="https://twitter.com/Radio_Arcane"
         target="_blank"
         title="Follow Radio Arcane on Twitter"
         aria-label="Follow Radio Arcane on Twitter"
      >
         <SvgIcon name="twitter" use="twitter" />
      </a>

      <a
         href="https://www.mixcloud.com/Radio-Arcane"
         target="_blank"
         title="Follow Radio Arcane on Mixcloud"
         aria-label="Follow Radio Arcane on Mixcloud"
      >
         <SvgIcon name="mixcloud" use="mixcloud" />
      </a>

      <a
         href="https://soundcloud.com/radio_arcane"
         target="_blank"
         title="Follow Radio Arcane on Soundcloud"
         aria-label="Follow Radio Arcane on Soundcloud"
      >
         <SvgIcon name="soundcloud" use="soundcloud" />
      </a>
   </div>
</template>

<script>
   import SvgIcon from '~/components/SvgIcon.vue';

   export default {
      components: {
         SvgIcon,
      },
   }
</script>

<style lang="scss">
   .social-icons {
      a {
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
