<template>
   <li class="tab">
      <a class="tab__link"
         :class="{ 'tab__link__active': active }"
         @click.prevent="onClick"
      >
         <slot />
      </a>
   </li>
</template>

<script>
   export default {
      name: 'Tab',
      props: {
         active: {
            type: Boolean,
            default: false
         },
         onClick: {
            type: Function,
         }
      }
   }
</script>

<style lang="scss">
   .tab {
   }

   .tab__link {
      display: block;
      border-top-left-radius: .25rem;
      border-top-right-radius: .25rem;
      @include fluid-type($screen-s-min, $screen-xxl-min, $font-base-size, 22px);
      padding: .5rem 1rem;
      background: transparent;
      color: $white;
      border: 1px solid transparent;
      border-bottom: 0;
      transition: all .2s ease-in-out;
      margin: 0 2px 0 0;

      &:hover,
      &:focus,
      &:active {
         color: $white;
         border-color: hex-to-rgba($white, 0.5);
      }
   }

   .tab__link__active {
      &,
      &:hover,
      &:focus,
      &:active {
         border-color: $white;
         background: $white;
         color: #333;
      }
   }
</style>
