<template>
   <component :is="is" class="text-center">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Center',
      props: {
         is: {
            type: String,
            default: 'div'
         }
      }
   }
</script>

<style lang="scss">
   .text-center {
      text-align: center;
   }
</style>
