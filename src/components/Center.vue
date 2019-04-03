<template>
   <component :is="tag" class="text-center">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Center',
      props: {
         tag: {
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
