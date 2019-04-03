<template>
   <component :is="tag" class="container">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Container',
      props: {
         tag: {
            type: String,
            default: 'div'
         }
      }
   }
</script>

<style lang="scss">
   .container {
      width: 100%;
      max-width: $max-container-width;
      padding-left: $gutter-width;
      padding-right: $gutter-width;
      margin-left: auto;
      margin-right: auto;
   }
</style>
