<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <Section :padBottom="true">
            <Title>Contact Radio Arcane</Title>

               <form name="contact" method="POST" data-netlify="true">
                  <label for="name">Name:<sup>*</sup></label>
                  <input type="text" id="name" name="name" maxlength="150" required />

                  <label for="email">Email Address:<sup>*</sup></label>
                  <input type="email" id="email" name="email" maxlength="150" required />

                  <label for="message">Message:<sup>*</sup></label>
                  <textarea id="message" name="message" required></textarea>

                  <Center>
                     <button class="btn" type="submit">Submit</button>
                  </Center>
               </form>
         </Section>
      </Container>
   </Layout>
</template>

<script>
   import { breadcrumb } from '~/util/jsonLd';
   import meta from '~/util/meta.js';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import ProfileCard from '~/components/ProfileCard.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaInfo = Object.assign({}, meta({
      title: 'Contact',
      description: 'Contact Radio Arcane',
      path: '/about'
   }), {
      script: [
         {
            type: 'application/ld+json',
            vmid: 'ldjson-schema',
            body: true,
            innerHTML: JSON.stringify(breadcrumb([{
               path: '/contact',
               name: 'Cotact'
            }]))
         },
      ],
      __dangerouslyDisableSanitizersByTagID: {
         'ldjson-schema': ['innerHTML']
      }
   });

   export default {
      metaInfo: metaInfo,
      components: {
         Breadcrumb,
         Center,
         Container,
         GridContainer,
         GridItem,
         Heading,
         ProfileCard,
         Section,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'Contact',
               to: '/contact'
            }],
         };
      }
   }
</script>

<style lang="scss">
</style>
