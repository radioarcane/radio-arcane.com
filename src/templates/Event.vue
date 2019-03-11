<template>
   <Layout>
      <Container>
         <article>
            <Title>{{ $page.event.title }}</Title>

            <div v-html="$page.event.description" />
         </article>
      </Container>
   </Layout>
</template>

<page-query>
   query Event ($path: String!) {
     event (path: $path) {
        title,
        date,
        description,
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
            title: this.$page.event.title
         }
      },
      data () {
         return {};
      }
   }
</script>

<style lang="scss">
</style>
