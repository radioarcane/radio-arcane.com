<template>
   <ul class="tabs">
      <slot />
   </ul>
</template>

<script>
   export default {
      name: 'Tabs',
   }
</script>

<style lang="scss">
   .tabs {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      align-items: flex-start;
      align-items: stretch;
      align-content: flex-start;
      padding: 0;
      margin: 0 0 2rem;
      border-bottom: 1px solid $white;
   }
</style>
