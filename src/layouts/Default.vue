<template>
   <div>
      <Header />

      <main class="main-content" role="main">
         <slot />
         <BackgroundNoise />
      </main>

      <Footer />
   </div>
</template>

<static-query>
   query {
     metadata {
       siteName
     }
   }
</static-query>

<script>
   import BackgroundNoise from '~/components/BackgroundNoise.vue';
   import Footer from './Footer.vue';
   import Header from './Header.vue';

   export default {
      components: {
         BackgroundNoise,
         Footer,
         Header
      },
   }
</script>

<style lang="scss">
   .main-content {
      position: relative;
      background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
      padding: 2rem 0;
      box-shadow: inset 0 0 150px $black;
      min-height: 60vh;
   }
</style>
