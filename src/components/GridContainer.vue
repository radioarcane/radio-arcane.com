<template>
   <div
      class="grid"
      :class="{'grid--center': center}"
   >
      <slot />
   </div>
</template>

<script>
   export default {
      name: 'GridContainer',
      props: {
         center: {
            type: Boolean,
            default: false,
            required: false
         },
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
   }
</style>
