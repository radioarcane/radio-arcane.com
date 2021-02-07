<template>
   <div>
      <Header />

      <main class="main-content" role="main">
         <slot />

         <!--
         <div v-if="showRadio">
            <Section :padTop="true">
               <Container>
                  <Radio />
               </Container>
            </Section>
         </div>
      -->

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
   import Container from '~/components/Container.vue';
   import Section from '~/components/Section.vue';
   import Footer from './Footer.vue';
   import Header from './Header.vue';
   import Radio from './Radio.vue';

   export default {
      components: {
         BackgroundNoise,
         Container,
         Footer,
         Header,
         Radio,
         Section
      },
      data () {
         return {
            showRadio: true,
         };
      },
      mounted () {
         if (this.$route && this.$route.path === "/radio") {
            this.showRadio = false;
         }
         else {
            this.showRadio = true;
         }
      }
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
