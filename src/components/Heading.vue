<template>
   <component
      :is="tag"
      class="heading"
      :class="{
         'heading--animate': animate,
         'heading--strike': strike,
         'heading--uppercase': uppercase,
      }"
   >
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Heading',
      props: {
         tag: {
            default: 'h2',
            type: String
         },
         strike: {
            default: false,
            type: Boolean,
            required: false
         },
         animate: {
            default: false,
            type: Boolean,
            required: false
         },
         uppercase: {
            default: false,
            type: Boolean,
            required: false
         }
      }
   }
</script>

<style lang="scss">
   .heading {
      &--uppercase {
         text-transform: uppercase;
      }

      &--animate {
         animation: heading-animation .25s infinite;
      }

      &--strike {
         overflow: hidden;
         text-align: center;
         border: 0;
         box-shadow: none !important;

         &:before,
         &:after {
            content: '';
            display: inline-block;
            height: 2px;
            position: relative;
            top: -2px;
            vertical-align: middle;
         }

         &:before {
           background-color: hex-to-rgba($white, 0.7);
           left: -.5em;
           margin-left: -100%;
           width: 100%;
         }

         &:after {
           background-color: hex-to-rgba($white, 0.7);
           left: .5em;
           margin-right: -100%;
           width: 100%;
         }
      }
   }

   @keyframes heading-animation {
   	0% {
         text-shadow: 0 0 5px $light;
      }
   	30% {
         text-shadow: 0 0 6px $light;
      }
      50% {
         color: hex-to-rgba($white, 0.9);
      }
      51% {
         color: $white;
      }
   	65% {
         text-shadow: 0 0 7px $white;
      }
   	100% {
         text-shadow: 0 0 9px $light;
      }
   }
</style>
