<template>
   <component
      class="grid"
      :class="{'grid--center': center, 'grid--collapse': collapse}"
      :is="is"
   >
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'GridContainer',
      props: {
         center: {
            type: Boolean,
            default: false,
         },
         collapse: {
            type: Boolean,
            default: false,
         },
         is: {
            type: String,
            default: 'div'
         }
      },
   }
</script>

<style lang="scss">

   .grid {
       display: flex;
       flex-wrap: wrap;
       align-items: stretch;
       align-content: flex-start;
       justify-content: flex-start;
       margin: 0 ($gutter-width / 2) * -1;

       &--center {
          justify-content: center
       }

       &--collapse {
          margin-left: $gutter-width * -1;
          margin-right: $gutter-width * -1;
       }
   }
</style>
