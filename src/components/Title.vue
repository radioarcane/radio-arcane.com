<template>
   <component :is="tag" class="title">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Title',
      props: {
         tag: {
            default: 'h1',
            type: String
         }
      }
   }
</script>

<style lang="scss">
   .title {
      border-bottom: 1px solid hex-to-rgba($white-smoke, 0.7);
   }
</style>
