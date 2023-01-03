<template>
   <header class="mast-header" role="banner">
      <div class="mast-header__brand">
         <router-link to="/">
            <picture>
               <source srcset="/img/logo--radio-arcane.webp" type="image/webp">
               <source srcset="/img/logo--radio-arcane.png" type="image/png">
               <img src="/img/logo--radio-arcane.png" alt="Radio Arcane">
            </picture>
         </router-link>
      </div>

      <div class="mast-header__nav">
         <nav id="navigation"
             class="mast-nav"
             :class="{'mast-nav--active' : activeNav}"
             role="navigation"
         >
            <ul class="nav-menu">
               <li v-for="(item, index) in links" class="nav-menu__item" :key="index" :aria-haspopup="item.hasOwnProperty('children') ? 'true' : 'false'">
                  <g-link class="nav-menu__link" :to="item.to" @click.native="activeNav = false"
                  >{{ item.name }}</g-link>

                  <ul v-if="item.hasOwnProperty('children')" class="nav-menu__submenu" :data-submenu="index">
                     <li v-for="(child, index2) in item.children" :key="index2" class="nav-menu__submenu__item">
                           <g-link class="nav-menu__submenu__link" :to="child.to" @click.native="activeNav = false"
                           >{{ child.name }}</g-link>
                     </li>
                  </ul>
               </li>
            </ul>
         </nav>
      </div>

      <div class="mast-header__social">
         <SocialIcons />
      </div>

      <a id="nav-toggle"
         class="nav-toggle"
         :class="{'nav-toggle--active' : activeNav}"
         :title="activeNav ? 'Close Menu' : 'Open Menu'"
         :href="activeNav ? '#' : '#navigation'"
         @click.prevent="activeNav = !activeNav"
      >
         <span></span>
         <span></span>
         <span></span>
      </a>
   </header>
</template>

<script>
   import SocialIcons from './SocialIcons.vue';

   export default {
      components: {
         SocialIcons
      },
      data: () => {
         return {
            activeNav: false,
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
               name: 'Radio',
               to: '/radio'
            },
            {
               name: 'Playlists',
               to: '/playlists',
            },  
            {
               name: 'Mixes',
               to: '/mixes',
            },
            {
               name: 'Podcasts',
               to: '/podcasts',
            }, 
            {
               name: 'Contact',
               to: '/contact'
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
   .mast-header {
      position: relative;
      padding: $padding-vertical 0 0;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      border-bottom: 1px solid hex-to-rgba($white, 0.7);

      @include breakpoint($screen-m-min) {
         padding: $padding-vertical $gutter-width 0;
      }

      @include breakpoint($screen-l-min) {
         flex-direction: row;
         align-items: center;
         align-content: center;
      }

      &__brand {
         width: 225px;
         margin-left: ($gutter-width / 2);
         padding-bottom: 0.5rem;
         transition: all 150ms ease-in-out;

         @include breakpoint($screen-l-min) {
            width: 300px;
            margin-left: 0;
            padding-bottom: 0;
         }

         @include breakpoint($screen-xl-min) {
            width: 400px;
         }

         /* IE Fix... */
         a {
            display: block;
         }
      }

      &__nav {
         @include breakpoint($screen-m-min) {
            width: 100%;
         }
      }

      &__social {
         flex-grow: 1;
         text-align: center;
         padding: ($padding-vertical / 2) 0;
         border-top: 1px solid rgba(255, 255, 255, 0.5);
         background: radial-gradient(lighten($black, 10%) 30%, $black 30%);
         background-size: 4px 4px;

         @include breakpoint($screen-m-min) {
            border: 0;
            background: inherit;
            margin: 0;
            position: absolute;
            top: 1rem;
            right: $gutter-width;
         }

         @include breakpoint($screen-l-min) {
            top: 2rem;
         }
      }
   }

   .nav-toggle {
      position: absolute;
      top: 1.35rem;
      right: $gutter-width / 2;
      z-index: 9999;

      @include breakpoint($screen-m-min) {
         display: none;
      }

      span {
         width: 45px;
         height: 5px;
         margin: 8px auto;
         background-color: $white;
         display: block;
         transition: all 0.3s ease-in-out;
      }

      &--active {
         span {
            &:nth-child(1) {
              transform: translateY(13px) rotate(45deg);
            }

            &:nth-child(2) {
              opacity: 0;
            }

            &:nth-child(3) {
              transform: translateY(-13px) rotate(-45deg);
            }
         }
      }
   }

   #navigation {
      &:target {
         overflow: auto;
         max-height: 5000px;
      }
   }

   .mast-nav {
      font-family: $heading-font;
      text-transform: uppercase;
      max-height: 0;
      overflow: hidden;
      transition: all 250ms ease-in-out;
      position: relative;
      background: $secondary-color;
      background: linear-gradient(135deg, darken($secondary-color, 20%) 20%, $secondary-color 80%);
      opacity: 0.75;
      box-shadow: inset 0 0 100px $black;
      @include fluid-type($screen-s-min, $screen-m-min, 18px, 20px);

      &--active {
         overflow: auto;
         max-height: 5000px;
      }

      @include breakpoint($screen-m-min) {
         /*overflow: auto;*/
         overflow: visible;
         max-height: none;
         background: transparent;
         opacity: 1;
         font-size: 16px;
      }

      @include breakpoint($screen-l-min) {
         font-size: 18px;
      }

      @include breakpoint($screen-xl-min) {
         font-size: 24px;
      }

      @include breakpoint($screen-xxl-min) {
         font-size: 32px;
      }
   }

   .nav-menu {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;
      position: relative;

      @include breakpoint($screen-m-min) {
         text-align: left;
         justify-content: center;
      }

      &__item {
         display: block;
         width: 100%;
         position: relative;

         &[aria-haspopup="true"] {
            > a {
               display: none;

               @include breakpoint($screen-m-min) {
                  display: block;
               }
            }
         }

         @include breakpoint($screen-m-min) {
            width: auto;
            margin: 0 0.25em ($padding-vertical / 2) 0;
         }

         @include breakpoint($screen-l-min) {
            width: auto;
            margin-right: 0.5em;
         }
      }

      &__link {
         color: $white;
         transition: all 150ms ease-in-out;
         display: block;
         padding: ($padding-vertical / 1.6) $padding-horizontal ($padding-vertical / 2);
         border-bottom: 1px solid $black;
         position: relative;

         &:hover,
         &:focus,
         &:active {
            color: $white;
            background: $secondary-color;
         }

         @include breakpoint($screen-m-min) {
            border-bottom: transparent;
            padding: 0.45em 0.65em 0.3em;
            background: transparent;

            &:hover,
            &:focus,
            &:active {
               background: transparent;
               opacity: 0.8;
            }

            &.active--exact {
               border-bottom: 2px solid $white-smoke;
            }
         }

         @include breakpoint($screen-l-min) {
            padding: 0.1em 0.4em 0.1em;
         }
      }



      &__submenu {
         padding: 0;
         margin: 0;
         list-style: none;
         text-align: center;

         @include breakpoint($screen-m-min) {
            text-align: left;
            position: absolute;
            top: 100%;
            left: 0;
            display: block;
            width: 100%;
            z-index: 50;
            display: none;
            background: lighten($black, 5%);


            .nav-menu__item:hover &,
            .nav-menu__item:focus & {
               display: block;
            }
         }

         @include breakpoint($screen-xl-min) {
            font-size: 24px;
         }

         &[data-submenu="2"] {
            @include breakpoint($screen-m-min) {
               width: 200px;
            }

            @include breakpoint($screen-l-min) {
               width: 300px;
            }
         }

         &__item {
         }

         &__link {
            color: $white;
            transition: all 150ms ease-in-out;
            display: block;
            padding: ($padding-vertical / 1.6) $padding-horizontal ($padding-vertical / 2);
            border-bottom: 1px solid $black;
            position: relative;

            &.active--exact {
               @include breakpoint($screen-m-min) {
                  border: none !important;
               }
            }

            &:hover,
            &:focus,
            &:active {
               color: $white;
               background: $secondary-color;
            }

            @include breakpoint($screen-m-min) {
               border-bottom: transparent;
               padding: 0.25em 0.65em 0.2em;
               background: transparent;

               &:hover,
               &:focus,
               &:active {
                  background: transparent;
                  opacity: 0.8;
               }

               &.active--exact {
                  border-bottom: 2px solid $white-smoke;
               }
            }
         }
      }
   }
</style>
