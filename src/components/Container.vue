<template>
   <div class="container">
      <slot />
   </div>
</template>

<script>
   export default {
      name: 'Container'
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
