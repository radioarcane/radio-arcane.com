<template>
   <div>
      <Header />

      <div class="content-wrapper">
         <main class="main-content" role="main">
            <slot />

            <BackgroundNoise />
         </main>

         <Sidebar />
      </div>

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
   import Sidebar from './Sidebar.vue';

   export default {
      components: {
         BackgroundNoise,
         Container,
         Footer,
         Header,
         Radio,
         Section,
         Sidebar
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

         var script = document.createElement('script');
         script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';


         kofiWidgetOverlay.draw('radioarcane', {
             'type': 'floating-chat',
             'floating-chat.donateButton.text': 'Support me',
             'floating-chat.donateButton.background-color': '#323842',
             'floating-chat.donateButton.text-color': '#fff'
         });
      }
   }
</script>

<style lang="scss">
   .content-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      align-content: flex-start;
      justify-content: flex-start;
      width: 100%;
      background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
      padding: 2rem 0;
      box-shadow: inset 0 0 150px $black;
      position: relative;
      justify-content: center;
   }

   .main-content {
      position: relative;
      min-height: 60vh;
      width: 100%;

      @include breakpoint($screen-l-min) {
         width: 75%;
      }

      @include breakpoint($screen-l-min) {
         width: 80%;
      }
   }


   .floating-chat-kofi-popup-iframe,
   .floatingchat-container-wrap {
      left: auto !important;
      right: 16px;
   }
</style>
