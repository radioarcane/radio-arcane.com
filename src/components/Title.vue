<template>
   <h1 class="title">
      <slot />
   </h1>
</template>

<script>
   export default {
      name: 'Title',
   }
</script>

<style lang="scss">
   .title {
      border-bottom: 1px solid hex-to-rgba($white, 0.7);
   }
</style>
