<template>
   <section class="section">
      <slot />
   </section>
</template>

<script>
   export default {
      name: 'Section'
   }
</script>

<style lang="scss">
   .section {
      padding-bottom: 2.5rem;
   }
</style>
