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

   }

   .heading--uppercase {
      text-transform: uppercase;
   }

   .heading--animate {
      animation: heading-animation .25s infinite;
   }

   .heading--strike {
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

   //box-shadow: 0 4px 2px -2px gray;

   @keyframes heading-animation {
   	0% {
         text-shadow: 0 0 5px $light;
         box-shadow:  0 8px 6px -6px rgba(255,255,255,.8);
      }
      25% {
         box-shadow: 0 5px 9px -9px $light;
      }
   	30% {
         text-shadow: 0 0 6px $light;
      }
      50% {
         box-shadow: 0 5px 9px -9px rgba(255,255,255,.75);
         color: hex-to-rgba($white, 0.9);
      }
      51% {
         color: $white;
      }
   	65% {
         text-shadow: 0 0 7px #fff;
      }
      75% {
         box-shadow: 0 5px 10px -10px $light;
      }
   	100% {
         text-shadow: 0 0 9px $light;
         box-shadow: 0 5px 5px -5px rgba(250,250,250,.8);
      }
   }
</style>
