<template>
   <footer class="footer" role="contentinfo">
      <nav class="footer__nav">
         <ul class="nav-footer">
            <li v-for="(item, index) in links" class="nav-footer__item" :key="index">
               <router-link class="nav-footer__link" :to="item.to">{{ item.name }}</router-link>
            </li>
         </ul>
      </nav>

      <div class="footer__social">
         <h4 class="footer__social__title">Follow Radio Arcane</h4>
         <SocialIcons />
      </div>

      <div class="footer__copy">
         &copy; {{ new Date() | moment("YYYY") }} Radio Arcane
      </div>
   </footer>
</template>

<script>
   import SocialIcons from './SocialIcons.vue';

   export default {
      components: {
         SocialIcons
      },
      data: () => {
         return {
            links: [
            {
               name: 'Home',
               to: '/',
            }, 
            {
               name: 'Events',
               to: '/events',
            }, 
            {
               name: 'Streaming Radio',
               to: '/radio'
            }, 
            {
               name: 'Playlists',
               to: '/playlists',
            }, 
            {
               name: 'Mixes',
               to: '/mixes'
            }, 
            {
               name: 'Podcasts',
               to: '/podcasts',
            }, 
            {
               name: 'Contact',
               to: '/contact',
            }, 
            {
               name: 'Affiliates',
               to: '/affiliates'
            }]
         }
      }
   }
</script>

<style lang="scss">
   .footer {
      border-top: 1px solid hex-to-rgba($white, 0.7);
      padding: ($padding-vertical *2) ($gutter-width/2);
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: center;

      &__nav {
         @include fluid-type($screen-s-min, $screen-xxl-min, 14px, 24px);
      }

      &__social {
         padding-top: $padding-vertical;
         padding-bottom: $padding-vertical;
         display: flex;
         flex-wrap: wrap;
         justify-content: center;
         align-items: center;
         align-content: center;

         @include breakpoint($screen-xl-min) {
            font-size: 16px;
         }

         &__title {
            margin: 0 0 1rem;

            @include breakpoint(505px) {
               margin: 0;
            }
         }
      }

      &__copy {
         text-align: center;
         font-size: 80%;
         padding-top: $padding-vertical;
         width: 100%;
      }
   }

   .nav-footer {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: stretch;
      align-content: center;
      padding: 0;
      margin: 0;

      &__item {
         margin: 0 $padding-horizontal 1em 0;

         @include breakpoint($screen-l-min) {
            margin-right: 2em;
         }
      }

      &__link {
         color: $white;

         &:hover,
         &:focus,
         &:active {
            color: darken($white, 40%);
         }
      }
   }
</style>
