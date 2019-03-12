<template>
   <Layout>
      <Container>
         <article>
            <Title>{{ $page.playlist.title }}</Title>

         </article>
      </Container>
   </Layout>
</template>

<page-query>
   query Playlist ($path: String!) {
     playlist (path: $path) {
        title,
     }
   }
</page-query>

<script>
   import Layout from '~/layouts/Default.vue'

   import Button from '~/components/Button.vue';
   import Container from '~/components/Container.vue';
   import Title from '~/components/Title.vue';

   export default {
      components: {
         Layout,
         Container,
         Title
      },
      metaInfo () {
         return {
            title: this.$page.playlist.title
         }
      },
      data () {
         return {};
      }
   }
</script>

<style lang="scss">
</style>
