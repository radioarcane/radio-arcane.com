<template>
   <Layout>

      <Container class="text-center">
         <article>
            <FlashContainer>
               <p>Radio Arcane is a collective of Louisville dj’s that produce events centered around music predominately focused on the use of the synthesizer. Including: Gothic, Post-Punk, New-Wave, Synthwave, 80's, Minimal, Synthpop, Triphop, EBM, Shoegaze, Industrial, Futurepop, 90's, Dreamwave, Retro-Electro, etc.</p>
            </FlashContainer>
         </article>
      </Container>

      <Container tagName="section">
         <h3>Checkout Our Latest Podcast</h3>

         <MixcloudPlayer name="radio-arcane-01-louisville-gothic" />
      </Container>
   </Layout>
</template>

<script>
   import Button from '~/components/Button.vue';
   import Container from '~/components/Container.vue';
   import FlashContainer from '~/components/FlashContainer.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';

   export default {
      metaInfo: {
         title: 'Radio Arcane - Dark Eclectic Music',
         description: 'Add Meta Description...',
      },
      components: {
         Button,
         Container,
         FlashContainer,
         MixcloudPlayer,
      },
   }
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
