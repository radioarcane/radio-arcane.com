<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />
         <Title>Page Not Found...</Title>
      </Container>
   </Layout>
</template>

<script>
   import Container from '~/components/Container.vue';
   import Title from '~/components/Title.vue';

   export default {
      metaInfo: {
         title: 'Page Not Found | Radio Arcane'
      },
      components: {
         Container,
         Title,
      }
   }
</script>
